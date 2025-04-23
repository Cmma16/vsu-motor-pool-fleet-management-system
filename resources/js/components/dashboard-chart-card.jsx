import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function DashboardChartCard({ title, data, config, totalLabel, dataKey = 'quantity', nameKey = 'label' }) {
    const totalQuantity = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr[dataKey], 0);
    }, [data, dataKey]);

    return (
        <Card className="flex flex-col pb-0">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="mt-0 grid grid-cols-2 pb-0">
                <ChartContainer config={config} className="aspect-square max-h-[220px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={data} dataKey={dataKey} nameKey={nameKey} innerRadius={60} strokeWidth={5}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                    {totalQuantity.toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                    {totalLabel}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <div className="content-center space-y-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center space-x-1">
                            <div className="h-14 w-2 rounded" style={{ backgroundColor: item.fill }}></div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold">{item[dataKey]}</span>
                                <span>{item[nameKey]}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
