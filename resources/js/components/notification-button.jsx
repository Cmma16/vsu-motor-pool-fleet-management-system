import React from "react";

import { Bell, CheckCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NotificationButton({ notifications }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-center bg-white size-7 rounded-md drop-shadow-md">
          <Bell className="size-5" color="green" fill="green" />
          {notifications.some((n) => !n.read) && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 bg-white shadow-lg rounded-md">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Notifications
        </h3>
        {notifications.length > 0 ? (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center p-2 text-sm rounded-md ${
                  notification.read
                    ? "text-gray-400"
                    : "text-gray-700 font-medium"
                }`}
              >
                {notification.read ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <Bell className="h-4 w-4 mr-2" />
                )}
                <span>{notification.message}</span>
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
