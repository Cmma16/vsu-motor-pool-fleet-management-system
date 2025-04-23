import { EventDialog } from '@/components/calendar/event-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
    addDays,
    addMonths,
    addWeeks,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isAfter,
    isBefore,
    isSameDay,
    isSameMonth,
    isToday,
    setHours,
    setMinutes,
    startOfMonth,
    startOfWeek,
    subDays,
    subMonths,
    subWeeks,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React, { useState } from 'react';

export function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [view, setView] = useState('month');

    const next = () => {
        if (view === 'month') {
            setCurrentDate(addMonths(currentDate, 1));
        } else if (view === 'week') {
            setCurrentDate(addWeeks(currentDate, 1));
        } else if (view === 'day') {
            setCurrentDate(addDays(currentDate, 1));
        }
    };

    const prev = () => {
        if (view === 'month') {
            setCurrentDate(subMonths(currentDate, 1));
        } else if (view === 'week') {
            setCurrentDate(subWeeks(currentDate, 1));
        } else if (view === 'day') {
            setCurrentDate(subDays(currentDate, 1));
        }
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
        setIsDialogOpen(true);
    };
    // Update the handleAddEvent function
    const handleAddEvent = (event) => {
        const newEvent = {
            ...event,
            id: crypto.randomUUID(),
        };
        setEvents([...events, newEvent]);
        setIsDialogOpen(false);
    };

    // Update the getEventsForDate function to check if a date falls within an event's range
    const getEventsForDate = (date) => {
        return events.filter((event) => {
            const eventStart = new Date(event.startDate);
            const eventEnd = new Date(event.endDate);
            return date >= eventStart && date <= eventEnd;
        });
    };

    // Get events for a specific hour on a specific date
    const getEventsForHour = (date, hour) => {
        const startHour = setMinutes(setHours(new Date(date), hour), 0);
        const endHour = setMinutes(setHours(new Date(date), hour + 1), 0);

        return events.filter((event) => {
            const eventStart = new Date(event.startDate);
            const eventEnd = new Date(event.endDate);
            return (isBefore(eventStart, endHour) && isAfter(eventEnd, startHour)) || isSameDay(eventStart, date) || isSameDay(eventEnd, date);
        });
    };

    // Add a function to determine if an event starts on a specific date
    const isEventStart = (event, date) => {
        return isSameDay(new Date(event.startDate), date);
    };

    // Add a function to determine if an event ends on a specific date
    const isEventEnd = (event, date) => {
        return isSameDay(new Date(event.endDate), date);
    };

    // Get the header text based on the current view
    const getHeaderText = () => {
        if (view === 'month') {
            return format(currentDate, 'MMMM yyyy');
        } else if (view === 'week') {
            const weekStart = startOfWeek(currentDate);
            const weekEnd = endOfWeek(currentDate);
            return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
        } else {
            return format(currentDate, 'EEEE, MMMM d, yyyy');
        }
    };

    // Render the month view
    const renderMonthView = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

        return (
            <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-2 text-center text-sm font-medium">
                        {day}
                    </div>
                ))}
                {monthDays.map((day, i) => {
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
                                    <Badge
                                        key={event.id}
                                        variant="secondary"
                                        className={cn(
                                            'block truncate text-xs',
                                            isEventStart(event, day) && 'rounded-r-none border-r-0',
                                            isEventEnd(event, day) && 'rounded-l-none border-l-0',
                                            !isEventStart(event, day) && !isEventEnd(event, day) && 'rounded-none border-r-0 border-l-0',
                                            !isEventStart(event, day) && 'pl-1', // Indent slightly if continuing from previous day
                                        )}
                                    >
                                        {isEventStart(event, day) && event.title}
                                        {!isEventStart(event, day) && !isEventEnd(event, day) && '•••'}
                                        {isEventEnd(event, day) && !isEventStart(event, day) && '•••'}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // Render the week view
    const renderWeekView = () => {
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

        return (
            <div className="grid grid-cols-8 gap-2">
                <div className="py-2 text-center text-sm font-medium"></div>
                {weekDays.map((day) => (
                    <div key={day.toString()} className="py-2 text-center text-sm font-medium">
                        <div>{format(day, 'EEE')}</div>
                        <div
                            className={cn(
                                'mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm',
                                isToday(day) && 'bg-primary text-primary-foreground',
                            )}
                        >
                            {format(day, 'd')}
                        </div>
                    </div>
                ))}

                {Array.from({ length: 12 }).map((_, hour) => {
                    const displayHour = hour + 8; // Start from 8 AM
                    return (
                        <React.Fragment key={hour}>
                            <div className="text-muted-foreground border-t py-2 pr-2 text-right text-sm">
                                {displayHour % 12 === 0 ? 12 : displayHour % 12} {displayHour >= 12 ? 'PM' : 'AM'}
                            </div>
                            {weekDays.map((day) => {
                                const hourEvents = getEventsForHour(day, displayHour);
                                return (
                                    <div
                                        key={day.toString() + hour}
                                        className="hover:bg-accent/50 min-h-[60px] cursor-pointer border-t p-1"
                                        onClick={() => {
                                            const selectedDateTime = setHours(day, displayHour);
                                            setSelectedDate(selectedDateTime);
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        {hourEvents.map((event) => (
                                            <Badge key={event.id} variant="secondary" className="mb-1 block truncate text-xs">
                                                {event.title}
                                            </Badge>
                                        ))}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    };

    // Render the day view
    const renderDayView = () => {
        return (
            <div className="grid grid-cols-1 gap-2">
                <div className="py-2 text-center text-lg font-medium">{format(currentDate, 'EEEE')}</div>

                {Array.from({ length: 24 }).map((_, hour) => {
                    const hourEvents = getEventsForHour(currentDate, hour);
                    return (
                        <div
                            key={hour}
                            className="hover:bg-accent/50 flex min-h-[60px] cursor-pointer items-start border-t p-2"
                            onClick={() => {
                                const selectedDateTime = setHours(currentDate, hour);
                                setSelectedDate(selectedDateTime);
                                setIsDialogOpen(true);
                            }}
                        >
                            <div className="text-muted-foreground w-16 pr-4 text-right text-sm">
                                {hour % 12 === 0 ? 12 : hour % 12} {hour >= 12 ? 'PM' : 'AM'}
                            </div>
                            <div className="flex-1">
                                {hourEvents.map((event) => (
                                    <Badge key={event.id} variant="secondary" className="mb-1 block w-full truncate text-xs">
                                        {event.title}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

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

            <Tabs value={view} onValueChange={(v) => setView(v)} className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="day">Day</TabsTrigger>
                </TabsList>

                <Card className="overflow-x-auto p-4">
                    <TabsContent value="month" className="mt-0">
                        {renderMonthView()}
                    </TabsContent>

                    <TabsContent value="week" className="mt-0">
                        {renderWeekView()}
                    </TabsContent>

                    <TabsContent value="day" className="mt-0">
                        {renderDayView()}
                    </TabsContent>
                </Card>
            </Tabs>

            <EventDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} selectedDate={selectedDate} onAddEvent={handleAddEvent} />
        </div>
    );
}
