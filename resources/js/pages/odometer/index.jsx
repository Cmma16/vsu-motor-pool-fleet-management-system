import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import AppLayout from '@/layouts/app-layout';

import { VehicleSelector } from '@/components/display/vehicle-selector';
import { EditOdometerDialog } from '@/components/odometer/edit-odometer-dialog';
import { OdometerLogsView } from '@/components/odometer/odometer-logs-view';
import { Head, router } from '@inertiajs/react';
import React from 'react';

const breadcrumbs = [
    {
        title: 'Odometer Logs',
        href: '/odometer',
    },
];

const pageDetails = {
    title: 'Odometer Logs',
    description: 'Track and manage vehicle odometer readings',
};

export default function OdometerLogIndex({ odometerLogs, vehicles }) {
    const [selectedVehicle, setSelectedVehicle] = React.useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [editingLog, setEditingLog] = React.useState(null);

    // Initialize with the first vehicle
    React.useEffect(() => {
        if (vehicles.length > 0 && !selectedVehicle) {
            setSelectedVehicle(vehicles[0]);
        }
    }, [vehicles, selectedVehicle]);

    const deleteOdometerReading = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('odometer.destroy', { id }));
        }
    };

    const editOdometerReading = (odometerLog) => {
        setEditingLog(odometerLog);
        setIsEditDialogOpen(true);
    };

    const filteredOdometerLogs = selectedVehicle ? odometerLogs.filter((log) => log.vehicle_id === selectedVehicle.vehicle_id) : [];

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repairs" />
            <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
                <div className="space-y-6 overflow-y-auto md:col-span-1">
                    <VehicleSelector vehicles={vehicles} selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} />
                </div>
                <div className="space-y-6 md:col-span-3">
                    <OdometerLogsView
                        selectedVehicle={selectedVehicle}
                        odometerLogs={filteredOdometerLogs}
                        handleDelete={deleteOdometerReading}
                        handleEdit={editOdometerReading}
                        vehicles={vehicles}
                    />
                </div>
                <EditOdometerDialog isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} editingLog={editingLog} vehicles={vehicles} />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
