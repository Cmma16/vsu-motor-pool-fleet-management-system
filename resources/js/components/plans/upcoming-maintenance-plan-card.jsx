import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UpcomingMaintenancePlanCard({ upcomingMaintenancePlans }) {
    return (
        <Card className="lg:col-span-4">
            <CardHeader className="pb-2">
                <CardTitle>Upcoming Maintenance Plans</CardTitle>
                <CardDescription>Scheduled maintenance plans for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {upcomingMaintenancePlans.length === 0 ? (
                        <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
                            <span className="mb-2 text-3xl">🎉</span>
                            <span className="text-lg font-medium">No maintenance plans scheduled for the next 7 days!</span>
                        </div>
                    ) : (
                        upcomingMaintenancePlans.map((plan) => (
                            <div key={`plan-${plan.id}`} className="rounded-lg border p-3">
                                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold">{plan.description}</h3>
                                            <Badge key={`badge-${plan.id}`} variant={plan.status === 'Pending Approval' ? 'outline' : 'secondary'}>
                                                {plan.status}
                                            </Badge>
                                        </div>
                                        <div className="text-muted-foreground text-sm">{plan.vehicle_name}</div>
                                    </div>
                                    <div className="mt-1 text-sm sm:mt-0 sm:text-right">
                                        <div>{plan.scheduled_date}</div>
                                        <div className="text-muted-foreground">{plan.next_service_km} km</div>
                                    </div>
                                </div>
                                <div className="mt-2 flex gap-2">
                                    <Button key={`view-${plan.id}`} variant="outline" size="sm">
                                        View Details
                                    </Button>
                                    {plan.status === 'scheduled' && (
                                        <Button key={`request-${plan.id}`} variant="outline" size="sm">
                                            File a Request
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
