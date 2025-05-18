import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OctagonAlert } from 'lucide-react';

export default function LowStockPartsCard({ lowStockParts }) {
    return (
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Low Stock Parts</CardTitle>
                <CardDescription>Parts that are running low</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {lowStockParts.length === 0 ? (
                        <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
                            <OctagonAlert className="mb-2 h-8 w-8 text-green-500" />
                            <span className="text-lg font-medium">All parts are sufficiently stocked!</span>
                        </div>
                    ) : (
                        lowStockParts.map((part) => (
                            <Card key={`part-${part.id}`} className="overflow-hidden border-l-4 border-l-[#dc2626]">
                                <CardContent className="p-2">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 key={`name-${part.id}`} className="font-medium">
                                                {part.part_name}
                                            </h4>
                                            <p key={`stock-${part.id}`} className="text-muted-foreground text-sm">
                                                Current Stock: {part.stock_quantity} {part.unit}
                                            </p>
                                            <div key={`threshold-${part.id}`} className="mt-1 flex items-center gap-1 text-red-500">
                                                <OctagonAlert className="h-3 w-3" />
                                                <span className="text-xs">
                                                    Restock Threshold: {part.restock_threshold} {part.unit}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
