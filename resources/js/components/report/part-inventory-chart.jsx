import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const chartConfig = {
    current_stock: {
        label: 'Current Stock',
        color: '#22c55e', // Green
    },
    restock_threshold: {
        label: 'Restock Threshold',
        color: '#ab1200', // Red
    },
};

export default function PartsInventoryChart({ parts }) {
    return (
        <div className="mx-auto w-full rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4">
                <h3 className="mb-1 text-2xl font-bold text-gray-800">Parts Inventory Overview</h3>
                <p className="text-base text-gray-500">Current stock levels vs restock thresholds for each part</p>
            </div>
            <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={parts}
                        margin={{
                            top: 40,
                            right: 30,
                            left: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="part_name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            angle={-30}
                            textAnchor="end"
                            height={80}
                            interval={0}
                            style={{ fontSize: 13, fill: '#374151' }}
                        />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} style={{ fontSize: 13, fill: '#374151' }} />
                        <ChartTooltip cursor={{ fill: '#f3f4f6' }} content={<ChartTooltipContent indicator="dashed" />} />
                        <ChartLegend
                            content={
                                <ChartLegendContent
                                    style={{
                                        marginTop: 60,
                                        fontSize: 15,
                                        color: '#374151',
                                        fontWeight: 500,
                                    }}
                                />
                            }
                        />
                        <Bar
                            dataKey="current_stock"
                            name={chartConfig.current_stock.label}
                            fill={chartConfig.current_stock.color}
                            radius={[6, 6, 0, 0]}
                        >
                            <LabelList dataKey="current_stock" position="top" fill="#22c55e" fontSize={13} />
                        </Bar>
                        <Bar
                            dataKey="restock_threshold"
                            name={chartConfig.restock_threshold.label}
                            fill={chartConfig.restock_threshold.color}
                            radius={[6, 6, 0, 0]}
                        >
                            <LabelList dataKey="restock_threshold" position="top" fill="#ab1200" fontSize={13} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
}
