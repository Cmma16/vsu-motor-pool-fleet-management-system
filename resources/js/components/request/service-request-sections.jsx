import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

function getStatusBadge(status) {
    switch (status) {
        case 'pending':
            return (
                <Badge variant="outline" className="bg-gray-100">
                    Pending
                </Badge>
            );
        case 'assigned':
            return (
                <Badge variant="default" className="bg-green-500">
                    Assigned
                </Badge>
            );
        case 'received':
            return (
                <Badge variant="default" className="bg-blue-500">
                    Received
                </Badge>
            );
        case 'ongoing':
            return (
                <Badge variant="default" className="bg-yellow-500">
                    Ongoing
                </Badge>
            );
        case 'completed':
            return (
                <Badge variant="secondary" className="bg-gray-500">
                    Completed
                </Badge>
            );
        case 'cancelled':
            return (
                <Badge variant="destructive" className="bg-red-500">
                    Cancelled
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

export default function ServiceRequestSections({ requests, sectionTitle, sectionDescription, handleViewDetails }) {
    const formatDate = (date) => {
        const formattedDateTime = format(new Date(date), 'MMMM dd, yyyy');
        return formattedDateTime;
    };
    return (
        <Card className="flex-1">
            <CardHeader className="pb-2">
                <CardTitle>{sectionTitle}</CardTitle>
                <CardDescription>{sectionDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {requests.length === 0 ? (
                        <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
                            <span className="mb-2 text-3xl">😢</span>
                            <span className="text-lg font-medium">No {sectionTitle} found</span>
                        </div>
                    ) : (
                        requests.map((request) => (
                            <div key={`request-${request.request_id}`} className="rounded-lg border p-3">
                                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold">{request.work_description}</h3>
                                            {getStatusBadge(request.status)}
                                        </div>
                                        <div className="text-muted-foreground text-sm">{request.vehicle_name}</div>
                                    </div>
                                    <div className="mt-1 text-sm sm:mt-0 sm:text-right">
                                        <div>{formatDate(request.date_filed)}</div>
                                        <div className="text-muted-foreground">{`${request.status} at ${formatDate(request.updated_at)}`}</div>
                                    </div>
                                </div>
                                <div className="mt-2 flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(request.request_id)}>
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
