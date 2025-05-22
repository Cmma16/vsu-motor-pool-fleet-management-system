import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { AppSubHeader } from '@/components/app-sub-header';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
export default function AppSidebarLayout({ children, breadcrumbs = [], pageDetails, showQuickActions }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        router.on('start', () => setLoading(true));
        router.on('finish', () => setLoading(false));
        router.on('error', () => setLoading(false)); // catch errors too
    }, []);
    return (
        <AppShell variant="sidebar">
            {/* <AppLoader className="z-50 h-full w-full" /> */}
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <AppSubHeader pageDetails={pageDetails} showQuickActions={showQuickActions} />

                {children}
            </AppContent>
        </AppShell>
    );
}
