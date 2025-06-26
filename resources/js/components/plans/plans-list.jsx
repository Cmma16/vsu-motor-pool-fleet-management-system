import { DataCard } from '@/components/display/data-card';
import DestructiveDialog from '@/components/display/destructive-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

function getStatusBadge(status) {
    switch (status) {
        case 'scheduled':
            return (
                <Badge variant="outline" className="bg-gray-100 text-indigo-500">
                    Scheduled
                </Badge>
            );
        case 'pending':
            return (
                <Badge variant="default" className="bg-yellow-500">
                    Pending
                </Badge>
            );
        case 'completed':
            return (
                <Badge variant="default" className="bg-green-500">
                    Completed
                </Badge>
            );
        case 'cancelled':
            return (
                <Badge variant="default" className="bg-red-500">
                    Cancelled
                </Badge>
            );
    }
}

const ITEMS_PER_PAGE = 5;

export function PlansList({ maintenancePlans }) {
    const user = usePage().props.auth.user;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(maintenancePlans.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = maintenancePlans.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <>
            {currentItems.map((plan) => (
                <DataCard
                    key={plan.plan_id}
                    title={plan.vehicle_name}
                    data={[
                        { label: 'Scheduled date', value: format(plan.scheduled_date, 'LLL dd, yyyy') },
                        { label: 'Created by', value: plan.created_by },
                        { label: 'Status', value: getStatusBadge(plan.status) },
                    ]}
                    actions={
                        <div className="flex gap-1">
                            {(user.role.name === 'Admin' || user.role.name === 'Manager') && (
                                <Button
                                    size={'sm'}
                                    className="bg-yellow-300 text-black hover:bg-yellow-400"
                                    onClick={() => router(route('plans.edit'), plan.plan_id)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            )}
                            {user.role.name === 'Admin' && (
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
