import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TripSummaryCard({ todayTrips, upcomingTrips, availableVehicles }) {
    return (
        <div className="md:max-w-auto grid max-w-[100vw] grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
                {console.log(availableVehicles)}
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
                    <CardTitle className="text-sm font-medium">Available Vehicles</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {availableVehicles.filter((v) => !v.isAvailable).length}/{availableVehicles.length}
                    </div>
                    <p className="text-muted-foreground text-xs">Currently in use</p>
                </CardContent>
            </Card>
        </div>
    );
}
