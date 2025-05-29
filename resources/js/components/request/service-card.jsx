import RequestActions from '@/components/request/request-actions';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

function getStatusBadge(status) {
    switch (status) {
        case 'pending':
            return (
                <Badge variant="outline" className="bg-gray-100">
                    Pending
                </Badge>
            );
        case 'received':
            return (
                <Badge variant="default" className="bg-blue-500">
                    Received
                </Badge>
            );
        case 'inspected':
            return (
                <Badge variant="default" className="bg-yellow-500">
                    Inspected
                </Badge>
            );
        case 'approved':
            return (
                <Badge variant="default" className="bg-green-500">
                    Approved
                </Badge>
            );
        case 'cancelled':
            return (
                <Badge variant="default" className="bg-red-500">
                    Cancelled
                </Badge>
            );
        case 'conducted':
            return (
                <Badge variant="default" className="bg-purple-500">
                    Conducted
                </Badge>
            );
        case 'completed':
            return (
                <Badge variant="default" className="bg-green-600">
                    Completed
                </Badge>
            );
        default:
            return (
                <Badge variant="outline" className="bg-gray-200">
                    {status}
                </Badge>
            );
    }
}

export const ServiceCard = ({ request, onEdit, onDelete, onStatusUpdate }) => {
    return (
        <Card className="m-2 w-full">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                    <CardTitle className="text-base">{request.vehicle_name}</CardTitle>
                    <p className="text-muted-foreground text-sm">Requested by {request.requested_by}</p>
                </div>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
                <div>
                    <span className="font-medium">Date Filed:</span> {format(request.date_filed, 'LLL dd, yyyy')}
                </div>
                <div>
                    <span className="font-medium">Service Type:</span> {request.service_type}
                </div>
                <div>
                    <span className="font-medium">Description:</span> {request.work_description}
                </div>
                <div>
                    <span className="font-medium">Status:</span> <span>{getStatusBadge(request.status)}</span>
                </div>

                <RequestActions request={request} handleEdit={onEdit} handleDelete={onDelete} handleStatusUpdate={onStatusUpdate} />
            </CardContent>
        </Card>
    );
};
