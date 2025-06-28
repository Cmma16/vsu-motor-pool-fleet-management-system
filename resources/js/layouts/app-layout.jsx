import AppLoader from '@/components/display/app-loader';
import { useInertiaPageLoading } from '@/hooks/use-inertia-page-loading';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';

export default function AppLayout({ children, breadcrumbs, pageDetails, showQuickActions = true, ...props }) {
    const isLoading = useInertiaPageLoading();

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
