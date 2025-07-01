import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { CalendarDays, Car, CheckCircle, UsersIcon, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const AvailabilityDialog = ({ isAvailabilityOpen, setIsAvailabilityOpen }) => {
    const [availabilityStartDate, setAvailabilityStartDate] = useState(new Date());
    const [availabilityEndDate, setAvailabilityEndDate] = useState(new Date());
    const [availabilityTab, setAvailabilityTab] = useState('drivers');

    const [driverAvailability, setDriverAvailability] = useState([]);
    const [vehicleAvailability, setVehicleAvailability] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAvailability = async () => {
        if (!availabilityStartDate || !availabilityEndDate) return;

        try {
            setIsLoading(true);
            const res = await axios.get('/trips/check-availability', {
                params: {
                    start_date: format(availabilityStartDate, 'yyyy-MM-dd'),
                    end_date: format(availabilityEndDate, 'yyyy-MM-dd'),
                },
            });

            setDriverAvailability(res.data.drivers);
            setVehicleAvailability(res.data.vehicles);
            console.log(res);
        } catch (error) {
            console.error('Error fetching availability:', error);
        } finally {
            setIsLoading(false);
        }
    };
    // Automatically refetch when dates change
    useEffect(() => {
        fetchAvailability();
    }, [availabilityStartDate, availabilityEndDate]);
    return (
        <Dialog open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
            <DialogTrigger asChild>
                <Button className="bg-white" variant="outline">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Check Availability
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Check Driver & Vehicle Availability</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    {/* Date Selection */}
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Start Date</label>
                            <Input
                                type="date"
                                value={availabilityStartDate ? format(availabilityStartDate, 'yyyy-MM-dd') : ''}
                                onChange={(e) => {
                                    setAvailabilityStartDate(e.target.value ? new Date(e.target.value) : undefined);
                                    setAvailabilityEndDate(e.target.value ? new Date(e.target.value) : undefined);
                                }}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">End Date</label>
                            <Input
                                type="date"
                                value={availabilityEndDate ? format(availabilityEndDate, 'yyyy-MM-dd') : ''}
                                min={availabilityStartDate ? format(availabilityStartDate, 'yyyy-MM-dd') : ''}
                                onChange={(e) => setAvailabilityEndDate(e.target.value ? new Date(e.target.value) : undefined)}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Availability Display */}
                    {availabilityStartDate && availabilityEndDate && (
                        <div>
                            <div className="mb-4">
                                <h3 className="mb-2 text-lg font-semibold">
                                    Availability for {format(availabilityStartDate, 'MMM d, yyyy')}
                                    {availabilityStartDate.getTime() !== availabilityEndDate.getTime() &&
                                        ` - ${format(availabilityEndDate, 'MMM d, yyyy')}`}
                                </h3>
                            </div>

                            <Tabs value={availabilityTab} onValueChange={setAvailabilityTab}>
                                <TabsList className="mb-4 bg-white">
                                    <TabsTrigger value="drivers">
                                        <UsersIcon className="mr-2 h-4 w-4" />
                                        Drivers
                                    </TabsTrigger>
                                    <TabsTrigger value="vehicles">
                                        <Car className="mr-2 h-4 w-4" />
                                        Vehicles
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="drivers">
                                    <ScrollArea className="h-[300px] pr-4">
                                        <div className="space-y-4">
                                            {driverAvailability.map((driver) => (
                                                <div key={driver.id} className="flex items-start justify-between rounded-lg border bg-white p-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={driver.avatar || '/placeholder.svg'} alt={driver.name} />
                                                            <AvatarFallback>
                                                                {driver.name
                                                                    .split(' ')
                                                                    .map((n) => n[0])
                                                                    .join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <h4 className="font-medium">{driver.name}</h4>
                                                            <p className="text-muted-foreground text-sm">{driver.contact}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            {driver.isAvailable ? (
                                                                <>
                                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                                    <span className="text-sm font-medium text-green-700">Available</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircle className="h-5 w-5 text-red-500" />
                                                                    <span className="text-sm font-medium text-red-700">Unavailable</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        {!driver.isAvailable && (
                                                            <Collapsible>
                                                                <CollapsibleTrigger className="text-muted-foreground mb-1 cursor-pointer text-xs font-medium underline">
                                                                    Conflicting trips ({driver.conflictingTrips.length})
                                                                </CollapsibleTrigger>
                                                                <CollapsibleContent className="text-muted-foreground mt-1 text-xs">
                                                                    {driver.conflictingTrips.map((trip, index) => (
                                                                        <p key={index}>
                                                                            {trip.trip_number}: {format(parseISO(trip.start_date), 'MMM d')}
                                                                            {trip.start_date !== trip.end_date &&
                                                                                ` - ${format(parseISO(trip.end_date), 'MMM d')}`}
                                                                        </p>
                                                                    ))}
                                                                </CollapsibleContent>
                                                            </Collapsible>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </TabsContent>

                                <TabsContent value="vehicles">
                                    <ScrollArea className="h-[300px] pr-4">
                                        <div className="space-y-4">
                                            {vehicleAvailability.map((vehicle) => (
                                                <div key={vehicle.id} className="flex items-start justify-between rounded-lg border bg-white p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                                                            <Car className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium">{vehicle.name}</h4>
                                                            <p className="text-muted-foreground text-sm">
                                                                {vehicle.type} • {vehicle.plate_number} • {vehicle.capacity} capacity
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            {vehicle.isAvailable ? (
                                                                <>
                                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                                    <span className="text-sm font-medium text-green-700">Available</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircle className="h-5 w-5 text-red-500" />
                                                                    <span className="text-sm font-medium text-red-700">Unavailable</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        {!vehicle.isAvailable && (
                                                            <Collapsible>
                                                                <CollapsibleTrigger className="text-muted-foreground mb-1 cursor-pointer text-xs font-medium underline">
                                                                    Conflicting trips ({vehicle.conflictingTrips.length})
                                                                </CollapsibleTrigger>
                                                                <CollapsibleContent className="text-muted-foreground mt-1 text-xs">
                                                                    {vehicle.conflictingTrips.map((trip, index) => (
                                                                        <p key={index}>
                                                                            {trip.trip_number}: {format(parseISO(trip.start_date), 'MMM d')}
                                                                            {trip.start_date !== trip.end_date &&
                                                                                ` - ${format(parseISO(trip.end_date), 'MMM d')}`}
                                                                        </p>
                                                                    ))}
                                                                </CollapsibleContent>
                                                            </Collapsible>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </TabsContent>
                            </Tabs>
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <Button onClick={() => setIsAvailabilityOpen(false)}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AvailabilityDialog;
