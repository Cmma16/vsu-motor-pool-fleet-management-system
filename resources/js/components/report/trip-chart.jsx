import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function TripChart({ tripData, barKey, xKey, chartTitle, chartDescription, report_type }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{chartTitle}</CardTitle>
                <CardDescription>{chartDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={tripData}
                            layout="vertical"
                            margin={{
                                top: 20,
                                right: 30,
                                left: 150,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--muted))" />
                            <XAxis
                                type="number"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                allowDecimals={false}
                                tickCount={6}
                            />
                            <YAxis
                                dataKey={xKey}
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                width={150}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-background rounded-lg border p-2 shadow-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">Vehicle</span>
                                                        <span className="text-muted-foreground font-bold">{payload[0].payload.vehicle_name}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">{report_type}</span>
                                                        <span className="font-bold">{payload[0].value}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey={barKey} fill="#22c55e" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
