import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Filter, X } from 'lucide-react';

export function VehicleFilter({ isFilterOpen, setIsFilterOpen, selectedVehicles, toggleVehicleSelection, clearFilters, uniqueVehicles }) {
    return (
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
                <Button variant={selectedVehicles.length > 0 ? 'default' : 'outline'}>
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    {selectedVehicles.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                            {selectedVehicles.length}
                        </Badge>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter Trips</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <h3 className="mb-4 text-sm font-medium">Filter by Vehicle</h3>
                    <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-4">
                            {uniqueVehicles.map((vehicle) => (
                                <div key={vehicle.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={vehicle.id}
                                        checked={selectedVehicles.includes(vehicle.id)}
                                        onCheckedChange={() => toggleVehicleSelection(vehicle.id)}
                                    />
                                    <label
                                        htmlFor={vehicle.id}
                                        className="flex-1 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        <div>
                                            {vehicle.name} ({vehicle.type})
                                        </div>
                                        <div className="text-muted-foreground text-xs">{vehicle.plate_number}</div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="flex justify-between">
                    <Button variant="outline" onClick={clearFilters}>
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button>
                    <Button onClick={() => setIsFilterOpen(false)}>
                        <Check className="mr-2 h-4 w-4" />
                        Apply Filters
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
