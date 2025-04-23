import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function EventDialog({ isOpen, onClose, selectedDate, onAddEvent }) {
    const [title, setTitle] = useState('');
    const [dateRange, setDateRange] = useState(
        selectedDate
            ? {
                  from: selectedDate,
                  to: selectedDate,
              }
            : undefined,
    );
    const [purpose, setPurpose] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && dateRange?.from) {
            onAddEvent({
                title,
                startDate: dateRange.from,
                endDate: dateRange.to || dateRange.from, // If no end date, use start date
                purpose: purpose || undefined,
            });
            resetForm();
        }
    };

    const resetForm = () => {
        setTitle('');
        setDateRange(selectedDate ? { from: selectedDate, to: selectedDate } : undefined);
        setPurpose('');
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                    resetForm();
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Trip</DialogTitle>
                        <DialogDescription>Create a new trip for a vehicle. You can select a date range for multi-day trips.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Destination</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Trip destination" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="vehicle_id">Vehicle</Label>
                            <Select>
                                <SelectTrigger id="vehicle_id" tabIndex={1}>
                                    <SelectValue placeholder="Select vehicle" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* {vehicles.map((vehicle) => (
                                        <SelectItem key={vehicle.vehicle_id} value={String(vehicle.vehicle_id)}>
                                            {vehicle.vehicle_name}
                                        </SelectItem>
                                    ))} */}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Date Range</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn('w-full justify-start text-left font-normal', !dateRange && 'text-muted-foreground')}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateRange?.from ? (
                                            dateRange.to ? (
                                                <>
                                                    {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                                                </>
                                            ) : (
                                                format(dateRange.from, 'LLL dd, y')
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={dateRange?.from}
                                        selected={dateRange}
                                        onSelect={setDateRange}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="purpose">Purpose</Label>
                            <Textarea
                                id="purpose"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="State purpose of your trip"
                                rows={3}
                                className="resize-none"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!dateRange?.from || !title}>
                            Add Trip
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
