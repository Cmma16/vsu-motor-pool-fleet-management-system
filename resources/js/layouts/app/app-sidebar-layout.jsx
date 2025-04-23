import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { AppSubHeader } from '@/components/app-sub-header';

export default function AppSidebarLayout({ children, breadcrumbs = [], pageDetails }) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <AppSubHeader pageDetails={pageDetails} />

                {children}
            </AppContent>
        </AppShell>
    );
}
