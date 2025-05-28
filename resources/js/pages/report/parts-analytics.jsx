import PartsInventoryChart from '@/components/report/part-inventory-chart';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Reports',
        href: '/reports',
    },
];

const pageDetails = {
    title: 'Fleet Analytics',
    description: 'Comprehensive analytics and insights about your fleet operations.',
};

export default function FleetAnalytics({ parts_analytics }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Reports" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <PartsInventoryChart parts={parts_analytics} />
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                        <h4 className="font-semibold text-green-600">Well Stocked</h4>
                        <p className="text-2xl font-bold">{parts_analytics.filter((part) => part.current_stock > part.restock_threshold).length}</p>
                        <p className="text-muted-foreground text-sm">parts above threshold</p>
                    </div>

                    <div className="rounded-lg border p-4">
                        <h4 className="font-semibold text-red-600">Need Restocking</h4>
                        <p className="text-2xl font-bold">{parts_analytics.filter((part) => part.current_stock <= part.restock_threshold).length}</p>
                        <p className="text-muted-foreground text-sm">parts below threshold</p>
                    </div>

                    <div className="rounded-lg border p-4">
                        <h4 className="font-semibold text-blue-600">Total Parts</h4>
                        <p className="text-2xl font-bold">{parts_analytics.length}</p>
                        <p className="text-muted-foreground text-sm">in inventory</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
