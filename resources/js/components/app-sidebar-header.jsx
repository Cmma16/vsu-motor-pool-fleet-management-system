import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { NotificationButton } from '@/components/notification-button';
import React from 'react';

export function AppSidebarHeader({ breadcrumbs = [] }) {

    //to be replaced
    const [notifications, setNotifications] = React.useState([
        { id: 1, message: "Vehicle maintenance due soon", read: false },
        { id: 2, message: "New repair request submitted", read: true },
        { id: 3, message: "Fleet inspection scheduled", read: true },
    ]);

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center justify-between w-full gap-2">
                <div className='flex items-center'>   
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className=''>
                    <NotificationButton notifications={notifications}/>
                </div>
            </div>
        </header>
    );
}
