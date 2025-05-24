import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, router } from '@inertiajs/react';
import React from 'react';

import { QRCodeModal } from '@/components/display/qr-code-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BasicInfoCard } from '@/components/vehicle/basic-info-card';
import { OperationalDetailsCard } from '@/components/vehicle/operational-details-card';
import { TechnicalDetailsCard } from '@/components/vehicle/technical-details-card';
// import { Label } from '@/components/ui/label';
// import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { Calendar, Car, Clock, Loader2, MapPin, PenTool, QrCode, Settings, TriangleAlert, User } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Vehicles',
        href: '/vehicles',
    },
    {
        title: 'Details',
        href: 'vehicles/details',
    },
];

const pageDetails = {
    title: 'Vehicle Details',
    description: 'Comprehensive information about the vehicle, including specifications and status.',
};

export default function details({ vehicle, odometer_reading }) {
    const user = usePage().props.auth.user;
    const [isLoading, setIsLoading] = React.useState(false);

    const generateQRCode = () => {
        setIsLoading(true);
        router.get(route('vehicles.generate', vehicle.vehicle_id), {
            onSuccess: () => {
                console.log('QR Code generated successfully');
                setIsLoading(false);
            },
            onError: () => {
                console.log('Failed to generate QR Code');
                setIsLoading(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Vehicle Details" />
            <div className="container mx-auto px-4 py-6 md:px-6">
                <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
                    <div>
                        <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold md:text-3xl">
                            <Car className="h-6 w-6" />
                            {vehicle.vehicle_name}
                            {/* <span className="ml-2">{getStatusBadge(vehicleData.status)}</span> */}
                            {vehicle.qr_code_path && (user.role.name === 'Admin' || user.role.name === 'Staff') && (
                                <QRCodeModal vehicle_name={vehicle.vehicle_name} qr_code_path={vehicle.qr_code_path} asset_tag={vehicle.asset_tag} />
                            )}
                        </h1>
                    </div>
                    <div className="mt-4 flex gap-2 md:mt-0">
                        {!vehicle.qr_code_path && (user.role.name === 'Admin' || user.role.name === 'Staff') && (
                            <Button disabled={isLoading} variant="outline" size="sm" onClick={generateQRCode}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <QrCode className="mr-2 h-4 w-4" />
                                Generate QR Code
                            </Button>
                        )}
                        <Button variant="outline" size="sm">
                            <PenTool className="mr-2 h-4 w-4" />
                            Schedule Service
                        </Button>
                        <Button onClick={() => router.get(`${vehicle.vehicle_id}/edit`)} size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            Edit vehicle
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Left column - Basic info and details */}
                    <BasicInfoCard vehicle={vehicle} />
                    <TechnicalDetailsCard vehicle={vehicle} />
                    <OperationalDetailsCard vehicle={vehicle} odometer_reading={odometer_reading} />
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Current Assignment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center">
                                <User className="text-muted-foreground mr-2 h-5 w-5" />
                                <div>
                                    <p className="text-muted-foreground text-sm">Driver</p>
                                    <p className="font-medium">Carlos Miguel Advincula</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="text-muted-foreground mr-2 h-5 w-5" />
                                <div>
                                    <p className="text-muted-foreground text-sm">Destination</p>
                                    <p className="font-medium">VSU Tolosa Campus</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <TriangleAlert className="text-muted-foreground mr-2 h-5 w-5" />
                                <div>
                                    <p className="text-muted-foreground text-sm">Status</p>
                                    <p className="font-medium">Ongoing</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="space-y-6 md:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Maintenance Status</CardTitle>
                                    <Button variant="outline" size="sm">
                                        View Full History
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        {/* {isMaintenanceSoon() ? (
                                            <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-500" />
                                        ) : (
                                            <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                                        )} */}
                                        <div>
                                            <p className="font-medium">Next Scheduled Maintenance</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <Calendar className="text-muted-foreground h-4 w-4" />
                                                <p className={`text-sm`}>2025-05-02 (Due Soon)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Clock className="text-muted-foreground mt-0.5 h-5 w-5" />
                                        <div>
                                            <p className="font-medium">Last Service</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <Calendar className="text-muted-foreground h-4 w-4" />
                                                <p className="text-muted-foreground text-sm">2024-12-28</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h4 className="mb-3 font-medium">Recent Maintenance</h4>
                                    <div className="space-y-4">
                                        <div key={1} className="flex justify-between border-b pb-3">
                                            <div>
                                                <p className="font-medium">Maintenance</p>
                                                <p className="text-muted-foreground text-sm">2024-12-28</p>
                                                <p className="mt-1 text-sm">Oil change, filter replacement, brake inspection</p>
                                            </div>
                                            <div className="text-right">
                                                <Button variant="ghost" size="sm" className="mt-1 h-7">
                                                    Details
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        </AppLayout>
    );
}
