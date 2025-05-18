import { PersonnelColumn } from '@/components/personnel/personnel-column';
import { PersonnelTable } from '@/components/personnel/personnel-table';
import { UnverifiedPersonnelColumn } from '@/components/personnel/unverified-personnel-column';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Personnel',
        href: '/personnel',
    },
];

const pageDetails = {
    title: 'Personnel Management',
    description: 'View and manage personnel here.',
};

export default function PersonnelIndex({ personnel, roles, unverifiedPersonnel }) {
    const veiwPersonnelDetails = (id) => {
        router.get(route('personnel.show', { id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Parts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Tabs defaultValue="list" className="w-full">
                    <TabsList className="grid w-[400px] grid-cols-2 bg-white">
                        <TabsTrigger value="list">System Users</TabsTrigger>
                        <TabsTrigger value="verification">Pending Verification</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list">
                        <PersonnelTable
                            columns={PersonnelColumn}
                            data={personnel}
                            handleView={veiwPersonnelDetails}
                            roles={roles}
                            filterColumn={'personnel_name'}
                            placeholder={'Search personnel'}
                        />
                    </TabsContent>
                    <TabsContent value="verification">
                        <PersonnelTable
                            columns={UnverifiedPersonnelColumn}
                            data={unverifiedPersonnel}
                            handleView={veiwPersonnelDetails}
                            roles={roles}
                            filterColumn={'personnel_name'}
                            placeholder={'Search personnel'}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
