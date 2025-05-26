<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\OdometerLog;
use App\Http\Requests\Vehicle\StoreVehicleRequest;
use App\Http\Requests\Vehicle\UpdateVehicleRequest;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Services\QRCodeService;
use Illuminate\Http\Request;
use App\Models\MaintenancePlan;
use App\Models\ServiceRequest;
use App\Models\Maintenance;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('vehicles/list', [
            'vehicles' => Vehicle::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('vehicles/add-vehicle');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('vehicles', 'public');
            $validated['image_path'] = $imagePath;
        }
        $vehicle = Vehicle::create($validated);

        OdometerLog::create([
            'vehicle_id' => $vehicle->vehicle_id,
            'reading' => (int)$request->input('odometer_reading'),
            'logged_at' => now(),
            'recorded_by' => auth()->id(),
        ]);

        return redirect()->route('vehicles.show', $vehicle->vehicle_id);
    }

    public function generateQRCode(Vehicle $vehicle, QRCodeService $qrCodeService)
    {
        $qrCode = $qrCodeService->generateAndStore($vehicle->asset_tag);
        $vehicle->update(['qr_code_path' => $qrCode]);
        return redirect()->route('vehicles.show', $vehicle->vehicle_id);
    }

    public function scanQRCode(Request $request, QRCodeService $qrCodeService)
    {
        try {
            $encrypted = $request->input('encrypted');
            $assetTag = $qrCodeService->decrypt($encrypted);
    
            $vehicle = Vehicle::where('asset_tag', $assetTag)->firstOrFail();
    
            return redirect()->route('vehicles.show', $vehicle);
        } catch (\Exception $e) {
            return back()->withErrors(['qr' => $e->getMessage() . ' ']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        $odometer_reading = OdometerLog::OfVehicle($vehicle->vehicle_id)->orderBy('logged_at', 'desc')->first();

        $odometer_reading = $odometer_reading ? $odometer_reading : null;

        // Get the latest odometer reading for the vehicle
        $latestOdometerReading = $vehicle->latestOdometerLog?->reading ?? 0;

        // Get pending maintenance plans
        $nextMaintenance = MaintenancePlan::where('vehicle_id', $vehicle->vehicle_id)
            ->where('status', 'pending')
            ->where(function ($query) use ($latestOdometerReading) {
                // Either the scheduled date is upcoming or the next_service_km is approaching
                $query->where('scheduled_date', '>=', Carbon::parse(now())->timezone('Asia/Manila')->format('Y-m-d H:i:s'))
                    ->orWhere('next_service_km', '>=', $latestOdometerReading);
            })
            ->orderBy(function ($query) use ($latestOdometerReading) {
                // Calculate urgency score based on both date and odometer
                // Lower score means more urgent
                $query->selectRaw('
                    CASE 
                        WHEN scheduled_date <= datetime("now", "+7 days") THEN 1
                        WHEN next_service_km <= ? + 1000 THEN 1
                        ELSE 2
                    END as urgency_score', [$latestOdometerReading]);
            })
            ->orderBy('scheduled_date', 'asc')
            ->orderBy('next_service_km', 'asc')
            ->first();

        $latestMaintenance = ServiceRequest::where('vehicle_id', $vehicle->vehicle_id)
            ->where('status', 'completed')
            ->where('service_type', 'maintenance')
            ->orderBy('updated_at', 'desc')
            ->first();

            $latestRepair = Maintenance::with('serviceRequest')
            ->where('vehicle_id', $vehicle->vehicle_id)
            ->where('confirmed_by', '!=', null)
            ->whereHas('serviceRequest', function ($query) {
                $query->where('service_type', 'repair');
            })
            ->orderBy('updated_at', 'desc')
            ->first();

        return Inertia::render('vehicles/details', [
            'vehicle' => $vehicle,
            'odometer_reading' => $odometer_reading,
            'nextMaintenance' => $nextMaintenance,
            'latestMaintenance' => $latestMaintenance,
            'latestRepair' => $latestRepair,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('vehicles/edit-vehicle', [
            'vehicle' => $vehicle,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        $validated = $request->validated();
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($vehicle->image_path && Storage::disk('public')->exists($vehicle->image_path)) {
                Storage::disk('public')->delete($vehicle->image_path);
            }
    
            // Save new image
            $validated['image_path'] = $request->file('image')->store('vehicle_images', 'public');
        }

        $vehicle->update($validated);

        return redirect()->route('vehicles.show', $vehicle->vehicle_id);
    }

    public function updatePhoto(Request $request, Vehicle $vehicle)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($vehicle->image_path) {
            Storage::delete($vehicle->image_path); // delete old photo
        }

        $path = $request->file('image')->store('vehicles', 'public');

        $vehicle->update([
            'image_path' => $path,
        ]);

        return back()->with('success', 'Photo updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return redirect()->route('vehicles.index');
    }
}
