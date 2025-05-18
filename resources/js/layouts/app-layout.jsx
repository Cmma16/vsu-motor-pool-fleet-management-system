import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';

export default ({ children, breadcrumbs, pageDetails, showQuickActions = true, ...props }) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} pageDetails={pageDetails} showQuickActions={showQuickActions} {...props}>
        {children}
    </AppLayoutTemplate>
);
