import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { endOfDay, format, isToday, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import React from 'react';

import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/data-table';
import { TripColumn } from '@/components/trip/trip-column';
import { TripSummaryCard } from '@/components/trip/trip-summary-card';
import { TripsList } from '@/components/trip/trips-list';

const breadcrumbs = [
    {
        title: 'My Trips',
        href: '/trips/my-requests',
    },
];

const editTrip = (id) => {
    router.get(route('trips.edit', { id }));
};

const viewTripDetails = (id) => {
    router.get(route('trips.show', { id }));
};

const deleteTrip = (id) => {
    router.delete(
        route(
            'trips.destroy',
            { id },
            {
                onSuccess: () => {
                    toast.success('Trip deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete trip');
                },
            },
        ),
    );
};
const categoryFilters = {
    categoryTitle: 'status',
    filteredColumn: 'status',
    filterOptions: [
        { key: 0, value: 'pending', label: 'Pending' },
        { key: 1, value: 'assigned', label: 'Assigned' },
        { key: 2, value: 'ongoing', label: 'Ongoing' },
        { key: 3, value: 'completed', label: 'Completed' },
        { key: 4, value: 'cancelled', label: 'Cancelled' },
        { key: 5, value: 'rejected', label: 'Rejected' },
    ],
};

export default function MyRequests({ myRequests = [] }) {
    const [date, setDate] = React.useState(new Date());
    const isMobile = useIsMobile(); //
    const [availableVehicles, setAvailableVehicles] = useState(null);

    const pageDetails = {
        title: 'My Trips',
        description: 'Showing trips relevant to you.',
    };

    useEffect(() => {
        const getAvailableVehicles = async () => {
            try {
                const res = await axios.get('/trips/check-availability', {
                    params: {
                        start_date: format(new Date(), 'yyyy-MM-dd'),
                        end_date: format(new Date(), 'yyyy-MM-dd'),
                    },
                });
                setAvailableVehicles(res.data.vehicles);
            } catch (error) {
                console.error('Error fetching availability:', error);
            }
        };

        getAvailableVehicles();
    }, []);

    const todayTrips = myRequests.filter((trip) => {
        const start = parseISO(trip.start_date);
        const end = parseISO(trip.end_date);

        return isWithinInterval(new Date(), {
            start: startOfDay(start),
            end: endOfDay(end),
        });
    });
    const upcomingTrips = myRequests.filter((trip) => {
        const startDate = parseISO(trip.start_date);
        return startDate > new Date() && !isToday(startDate);
    });

    const handleStatusUpdate = (id, status) => {
        router.patch(
            route('trips.updateStatus', id),
            {
                status: status,
            },
            {
                onSuccess: () => {
                    toast('Trip status updated successfully');
                },
                onError: () => {
                    toast('Failed to update trip status');
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Vehicles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-2 sm:p-4">
                <div className="container mx-auto py-4 sm:py-6">
                    <div className="grid gap-4 sm:gap-6">
                        {/* Summary Cards */}
                        {console.log(myRequests)}
                        <TripSummaryCard todayTrips={todayTrips} upcomingTrips={upcomingTrips} availableVehicles={availableVehicles || []} />

                        {isMobile ? (
                            <div className="flex flex-col gap-2">
                                <TripsList getStatusBadge={getStatusBadge} trips={filteredTrips} />
                            </div>
                        ) : (
                            <DataTable
                                columns={TripColumn}
                                data={myRequests}
                                handleView={viewTripDetails}
                                handleEdit={editTrip}
                                handleDelete={deleteTrip}
                                filterColumn={'destination'}
                                placeholder={'Search trip destination'}
                                categoryFilters={categoryFilters}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
