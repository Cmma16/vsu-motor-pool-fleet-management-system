<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Http\Requests\Parts\StorePartRequest;
use App\Http\Requests\Parts\UpdatePartRequest;
use Inertia\Inertia;

class PartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('parts/index', [
            'parts' => Part::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('parts/add-part');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePartRequest $request)
    {
        Part::create($request->validated());

        return redirect()->route('parts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Part $part)
    {
        return Inertia::render('parts/details', [
            'part' => $part
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Part $part)
    {
        return Inertia::render('parts/edit-part', [
            'part' => $part,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePartRequest $request, Part $part)
    {
        $part->update($request->validated());

        return redirect()->route('parts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Part $part)
    {
        $part->delete();

        return redirect()->route('parts.index');
    }
}
