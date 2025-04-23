import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';

export default ({ children, breadcrumbs, pageDetails, ...props }) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} pageDetails={pageDetails} {...props}>
        {children}
    </AppLayoutTemplate>
);
