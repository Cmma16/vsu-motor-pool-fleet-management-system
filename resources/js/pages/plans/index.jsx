import { DataTable } from '@/components/data-table';
import { PlansColumn } from '@/components/plans/plans-column';
import { PlansList } from '@/components/plans/plans-list';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

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
    const isMobile = useIsMobile();
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
                {isMobile ? (
                    <div className="flex flex-col gap-2">
                        <Button
                            variant="default"
                            size="default"
                            className="flex w-full items-center sm:w-auto"
                            onClick={() => router.get(route('plans.create'))}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            New
                        </Button>
                        <PlansList maintenancePlans={maintenancePlans} />
                    </div>
                ) : (
                    <DataTable
                        columns={PlansColumn}
                        data={maintenancePlans}
                        handleCreate={user.role.name === 'Admin' || user.role.name === 'Manager' ? route('plans.create') : null}
                        handleView={null}
                        handleEdit={user.role.name === 'Admin' || user.role.name === 'Manager' ? editPlan : null}
                        handleDelete={user.role.name === 'Admin' ? deletePlan : null}
                        filterColumn={'vehicle_name'}
                        placeholder={'Search plan by vehicle name'}
                    />
                )}
            </div>
        </AppLayout>
    );
}
