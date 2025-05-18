import { DashboardCard } from '@/components/dashboard-card';
import { DashboardChartCard } from '@/components/dashboard-chart-card';

export default function GeneralDashboard({ totalVehicles, todayTrips, maintenanceDue, pendingRequests, vehicleSummary, personnelSummary }) {
    return (
        <div className="flex flex-col gap-4 p-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard cardData={totalVehicles} />
                <DashboardCard cardData={todayTrips} />
                <DashboardCard cardData={maintenanceDue} />
                <DashboardCard cardData={pendingRequests} />
            </div>
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                <DashboardChartCard
                    className=""
                    title="Vehicles Summary"
                    data={vehicleSummary}
                    config={{
                        available: { label: 'Available', color: 'green' },
                        inUse: { label: 'In Use', color: 'yellow' },
                        maintenance: { label: 'Maintenance or Repair', color: 'blue' },
                        retired: { label: 'Retired', color: 'red' },
                    }}
                    totalLabel="Total Vehicles"
                />
                <DashboardChartCard
                    title="Personnel Summary"
                    data={personnelSummary}
                    config={{
                        active: { label: 'On duty', color: 'hsl(var(--chart-1))' },
                        inactive: { label: 'Off Duty', color: 'hsl(var(--chart-2))' },
                    }}
                    totalLabel="Total Personnel"
                />
            </div>
        </div>
    );
}
