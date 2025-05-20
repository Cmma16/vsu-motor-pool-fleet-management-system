import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

export default function ServiceRequestSections({ requests, sectionTitle, sectionDescription }) {
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
                                            <Badge key={`badge-${request.id}`} variant={request.status === 'pending' ? 'outline' : 'secondary'}>
                                                {request.status}
                                            </Badge>
                                        </div>
                                        <div className="text-muted-foreground text-sm">{request.vehicle_name}</div>
                                    </div>
                                    <div className="mt-1 text-sm sm:mt-0 sm:text-right">
                                        <div>{formatDate(request.date_filed)}</div>
                                        <div className="text-muted-foreground">{`${request.status} at ${formatDate(request.updated_at)}`}</div>
                                    </div>
                                </div>
                                <div className="mt-2 flex gap-2">
                                    <Button variant="outline" size="sm">
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
