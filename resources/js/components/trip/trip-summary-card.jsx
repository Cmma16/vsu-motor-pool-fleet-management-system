import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TripSummaryCard({ todayTrips, upcomingTrips, trips }) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Today's Trips</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{todayTrips.length}</div>
                    <p className="text-muted-foreground text-xs">{todayTrips.filter((t) => t.status === 'in-progress').length} in progress</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{upcomingTrips.length}</div>
                    <p className="text-muted-foreground text-xs">Next 7 days</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {trips.filter((t) => t.status === 'ongoing').length}/{trips.length}
                    </div>
                    <p className="text-muted-foreground text-xs">Currently in use</p>
                </CardContent>
            </Card>
        </div>
    );
}
