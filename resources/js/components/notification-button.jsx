import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Bell, CheckCircle, Eye } from 'lucide-react';
import React from 'react';

export function NotificationButton() {
    const [notifications, setNotifications] = React.useState([]);

    React.useEffect(() => {
        axios.get('/notifications', { params: { limit: 5 } }).then((res) => {
            setNotifications(res.data);
        });
    }, []);

    const markAsRead = (id) => {
        axios.put(`/notifications/${id}/read`).then(() => {
            setNotifications((prev) => prev.map((n) => (n.notification_id === id ? { ...n, is_read: true } : n)));
        });
    };

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="flex size-7 items-center justify-center rounded-md bg-white drop-shadow-md">
                    <Bell className="size-5" color="green" fill="green" />
                    {unreadCount > 0 && <span className="absolute top-0 right-0 rounded-full bg-red-500 px-1 text-xs text-white">{unreadCount}</span>}
                </button>
            </PopoverTrigger>
            <PopoverContent className="mx-5 w-96 rounded-md bg-white p-2 shadow-lg">
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Notifications</h3>
                {notifications.length > 0 ? (
                    <div className="h-48 gap-2 overflow-y-auto">
                        {notifications.map((notification) => (
                            <div className="flex flex-col items-center justify-between rounded-md p-2 hover:bg-gray-100">
                                <div
                                    key={notification.id}
                                    className={`flex items-center text-sm ${notification.is_read ? 'text-gray-400' : 'font-medium text-gray-700'}`}
                                >
                                    {notification.is_read ? (
                                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                    ) : (
                                        <Bell className="mr-2 h-4 w-4" />
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">{notification.title}</span>
                                        <span>{notification.message}</span>
                                    </div>
                                    {!notification.is_read && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => markAsRead(notification.notification_id)}
                                            className="ml-auto hover:text-green-500"
                                        >
                                            <Eye className="size-4" />
                                        </Button>
                                    )}
                                </div>
                                {/* Time ago tag */}
                                <span className="self-end text-xs text-gray-500">
                                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No new notifications</p>
                )}
            </PopoverContent>
        </Popover>
    );
}
