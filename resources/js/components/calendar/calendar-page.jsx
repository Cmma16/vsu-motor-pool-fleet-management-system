import { EventDialog } from '@/components/calendar/event-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameMonth, isToday, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

export function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const next = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const prev = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
        setIsDialogOpen(true);
    };

    const handleAddEvent = (event) => {
        const newEvent = {
            ...event,
            id: crypto.randomUUID(),
        };
        setEvents([...events, newEvent]);
        setIsDialogOpen(false);
    };

    const getEventsForDate = (date) => {
        return events.filter((event) => {
            const eventStart = new Date(event.startDate);
            const eventEnd = new Date(event.endDate);
            return date >= eventStart && date <= eventEnd;
        });
    };

    const getHeaderText = () => {
        return format(currentDate, 'MMMM yyyy');
    };

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    // Get the start of the first week of the month view (might include days from previous month)
    const calendarStart = startOfWeek(monthStart);
    // Get the end of the last week of the month view (might include days from next month)
    const calendarEnd = endOfWeek(monthEnd);

    // Get all days to display in the calendar grid
    const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{getHeaderText()}</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={prev}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={next}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Card className="overflow-x-auto p-4">
                <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="py-2 text-center text-sm font-medium">
                            {day}
                        </div>
                    ))}
                    {calendarDays.map((day, i) => {
                        const dayEvents = getEventsForDate(day);
                        return (
                            <div
                                key={i}
                                className={cn(
                                    'min-h-[100px] rounded-md border p-2',
                                    !isSameMonth(day, currentDate) && 'bg-muted/50 text-muted-foreground',
                                    isToday(day) && 'border-primary',
                                    'hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors',
                                )}
                                onClick={() => handleDateClick(day)}
                            >
                                <div className="flex items-start justify-between">
                                    <span className={cn('text-sm font-medium', isToday(day) && 'text-primary')}>{format(day, 'd')}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedDate(day);
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                                <div className="mt-2 space-y-1">
                                    {dayEvents.map((event) => (
                                        <Badge key={event.id} variant="secondary" className="block truncate text-xs">
                                            {event.title}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            <EventDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} selectedDate={selectedDate} onAddEvent={handleAddEvent} />
        </div>
    );
}
