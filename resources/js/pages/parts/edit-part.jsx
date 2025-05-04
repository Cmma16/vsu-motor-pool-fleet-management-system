import PartsForm from '@/components/parts/parts-form';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Parts',
        href: '/parts',
    },
    {
        title: 'Edit',
        href: 'parts/edit',
    },
];

const pageDetails = {
    title: 'Edit Part',
    description: 'Update the details of the part.',
};

export default function EditPart({ part }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        part_name: part.part_name,
        stock_quantity: part.stock_quantity,
        unit: part.unit,
        unit_price: part.unit_price,
        restock_threshold: part.restock_threshold,
    });

    const editPart = (e) => {
        e.preventDefault();

        put(route('parts.update', part.part_id), {
            // data, // Sends all form data
            // forceFormData: true, // Ensures file uploads and proper formatting
            preserveScroll: true,
            onSuccess: () => {
                reset(); // Reset all fields after a successful submission
            },
            onError: (errors) => {
                console.log(errors); // Log errors for debugging
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Parts" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Part Information</CardTitle>
                        <CardDescription>Update the details of the part.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PartsForm formData={data} formType={'edit'} setData={setData} onSubmit={editPart} processing={processing} errors={errors} />
                    </CardContent>
                </Card>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        </AppLayout>
    );
}
