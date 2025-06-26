import { DataCard } from '@/components/display/data-card';
import DestructiveDialog from '@/components/display/destructive-dialog';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { NotepadText, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

const ITEMS_PER_PAGE = 5;

export function TripsList({ trips, getStatusBadge }) {
    const user = usePage().props.auth.user;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(trips.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = trips.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <>
            {currentItems.map((trip) => (
                <DataCard
                    key={trip.trip_id}
                    title={trip.trip_number}
                    subtitle={`Requested by ${trip.requesting_party}`}
                    data={[
                        { label: 'Date filed', value: format(trip.date_filed, 'LLL dd, yyyy') },
                        { label: 'Destination', value: trip.destination },
                        {
                            label: 'Trip dates',
                            value: trip.start_date === trip.end_date ? trip.start_date : `${trip.start_date} - ${trip.end_date}`,
                        },
                        { label: 'Vehicle', value: trip.vehicle.vehicle_name },
                        { label: 'Driver name', value: trip.driver_name },
                        { label: 'Status', value: getStatusBadge(trip.status) },
                    ]}
                    actions={
                        <div className="flex gap-1">
                            <Button onClick={() => viewTripDetails(trip.trip_id)} size={'sm'}>
                                <NotepadText className="h-4 w-4" />
                            </Button>
                            {(trip.status === 'pending' || trip.status === 'rejected') &&
                                (user.role.name === 'Manager' || user.role.name === 'Admin') && (
                                    <Button
                                        size={'sm'}
                                        className="bg-yellow-300 text-black hover:bg-yellow-400"
                                        onClick={() => editTrip(trip.trip_id)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                )}
                            {(trip.status === 'pending' || trip.status === 'rejected' || trip.status === 'cancelled') &&
                                (user.role.name === 'Manager' || user.role.name === 'Admin') && (
                                    <DestructiveDialog
                                        icon={Trash}
                                        iconOnly
                                        description="This action cannot be undone. This will permanently delete this trip request."
                                        action={() => deleteTrip(trip.trip_id)}
                                    />
                                )}
                        </div>
                    }
                />
            ))}
            {/* Pagination controls */}
            <div className="mt-4 flex justify-center gap-2">
                <Button
                    className="rounded border px-3 py-1 disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    Prev
                </Button>

                <span className="px-2">
                    {currentPage} / {totalPages}
                </span>

                <Button
                    className="rounded border px-3 py-1 disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Next
                </Button>
            </div>
        </>
    );
}
