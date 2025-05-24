import { DataTable } from '@/components/data-table';
import { PlansColumn } from '@/components/plans/plans-column';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';

import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Maintenance Plans',
        href: '/plans',
    },
];

const pageDetails = {
    title: 'Plans List',
    description: 'Manage maintenance plans here.',
};

export default function PlansIndex({ maintenancePlans }) {
    const user = usePage().props.auth.user;
    const deletePlan = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('plans.destroy', { id }));
        }
    };

    const veiwPlanDetails = (id) => {
        router.get(route('plans.show', { id }));
    };

    const editPlan = (id) => {
        router.get(route('plans.edit', { id }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Plans" />
            {console.log(maintenancePlans)}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={PlansColumn}
                    data={maintenancePlans}
                    handleCreate={user.role.name === 'Admin' || user.role.name === 'Staff' ? route('plans.create') : null}
                    handleView={veiwPlanDetails}
                    handleEdit={editPlan}
                    handleDelete={deletePlan}
                    filterColumn={'vehicle_name'}
                    placeholder={'Search plan by vehicle name'}
                />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
