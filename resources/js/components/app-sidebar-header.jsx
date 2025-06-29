import { Breadcrumbs } from '@/components/breadcrumbs';
import { NotificationButton } from '@/components/notification-button';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppSidebarHeader({ breadcrumbs = [] }) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full items-center justify-between gap-2">
                <div className="flex items-center">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className="">
                    <NotificationButton />
                </div>
            </div>
        </header>
    );
}
