import AppLoader from '@/components/display/app-loader';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';

export default function AppLayout({ children, breadcrumbs, pageDetails, showQuickActions = true, ...props }) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Inertia.on('start', () => setIsLoading(true));
        Inertia.on('finish', () => setIsLoading(false));
    }, []);

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
                    <AppLoader />
                </div>
            )}

            <AppLayoutTemplate breadcrumbs={breadcrumbs} pageDetails={pageDetails} showQuickActions={showQuickActions} {...props}>
                <div className={isLoading ? 'pointer-events-none opacity-50' : ''}>{children}</div>
            </AppLayoutTemplate>
        </>
    );
}
