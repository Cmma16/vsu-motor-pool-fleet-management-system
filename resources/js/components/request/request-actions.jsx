import DestructiveDialog from '@/components/display/destructive-dialog'; // assuming you have this
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { router, usePage } from '@inertiajs/react';
import { CircleArrowOutUpRight, FileWarning, Pencil, ScanSearch, Trash, Wrench } from 'lucide-react';

export const RequestActions = ({ request, handleEdit, handleDelete, handleStatusUpdate }) => {
    const { auth } = usePage().props;
    const role = auth.user.role.name;

    const goToMaintenanceRepair = () => {
        if (request.service_type === 'maintenance') {
            router.get(route('maintenance.show', { maintenance_id: request.maintenance_id }));
        } else {
            router.get(route('repairs.show', { maintenance_id: request.maintenance_id }));
        }
    };

    return (
        <div className="mt-2 flex flex-wrap justify-start gap-2">
            {role === 'Driver' && request.status === 'pending' && (
                <>
                    <Button className="bg-yellow-300 text-black hover:bg-yellow-400" size={'sm'} onClick={() => handleEdit(request.request_id)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <DestructiveDialog
                        icon={Trash}
                        iconOnly
                        description="This action cannot be undone. This will permanently delete your request."
                        action={() => handleDelete(request.request_id)}
                    />
                </>
            )}

            {role === 'Mechanic' && request.status === 'received' && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className="bg-yellow-300 text-black hover:bg-yellow-400"
                                onClick={() => router.get(route('request-inspections.create', { data: { requestId: request.request_id } }))}
                            >
                                <ScanSearch />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Inspect request</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}

            {role === 'Mechanic' && request.status === 'approved' && (
                <>
                    {['repair', 'maintenance', 'preventive'].includes(request.service_type) && (
                        <Button
                            className="bg-green-300 text-black hover:bg-green-400"
                            onClick={() => {
                                const type = request.service_type === 'repair' ? 'repairs' : request.service_type;
                                router.get(
                                    route(`${type}.create`, {
                                        data: {
                                            requestId: request.request_id,
                                            vehicleId: request.vehicle_id,
                                            ...(request.plan_id && { planId: request.plan_id }),
                                        },
                                    }),
                                );
                            }}
                        >
                            <Wrench />
                        </Button>
                    )}
                </>
            )}

            {(role === 'Manager' || role === 'Admin') && request.status === 'pending' && (
                <Button className="bg-yellow-300 text-black hover:bg-yellow-400" onClick={() => handleStatusUpdate(request.request_id, 'received')}>
                    Receive
                </Button>
            )}

            {(role === 'Manager' || role === 'Admin') && request.status === 'inspected' && (
                <>
                    {request.inspection_confirmed ? (
                        <>
                            <Button
                                className="bg-green-300 text-black hover:bg-green-400"
                                onClick={() => handleStatusUpdate(request.request_id, 'approved')}
                            >
                                Approve
                            </Button>
                            <Button
                                className="bg-red-300 text-black hover:bg-red-400"
                                onClick={() => handleStatusUpdate(request.request_id, 'rejected')}
                            >
                                Reject
                            </Button>
                        </>
                    ) : (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() => router.get(route('request-inspections.show', { inspection_id: request.inspection_id }))}
                                        className="bg-amber-300"
                                        variant="outline"
                                    >
                                        <FileWarning />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Inspection not confirmed — click to view</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </>
            )}

            {role === 'Manager' && request.status === 'conducted' && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={goToMaintenanceRepair} className="bg-amber-300" variant="outline">
                                <CircleArrowOutUpRight />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View unconfirmed maintenance/repair</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    );
};

export default RequestActions;
