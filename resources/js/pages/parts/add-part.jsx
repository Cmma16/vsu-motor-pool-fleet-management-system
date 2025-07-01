import PartsForm from '@/components/parts/parts-form';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    { title: 'Parts', href: '/parts' },
    { title: 'Add new part', href: '/parts/create-part' },
];

const pageDetails = {
    title: 'Add Part',
    description: 'Add a new part to the inventory.',
};

export default function AddPart() {
    const { data, setData, post, processing, errors, reset } = useForm({
        part_name: '',
        stock_quantity: '',
        unit: '',
        unit_price: '',
        restock_threshold: '',
    });

    const addPart = (e) => {
        e.preventDefault();
        post(route('parts.store'), {
            data,
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Vehicles" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Part Details</CardTitle>
                        <CardDescription>Enter the details of the part you want to add.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PartsForm formData={data} formType={'add'} setData={setData} onSubmit={addPart} processing={processing} errors={errors} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
