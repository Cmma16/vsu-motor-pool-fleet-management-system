import OdometerLogForm from '@/components/odometer/odometer-log-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import React from 'react';

export function OdometerLogModal({ vehicle_id = null, vehicles, formType }) {
    const [open, setOpen] = React.useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: vehicle_id ?? '',
        reading: '',
        logged_at: '',
    });

    const isScoped = vehicle_id !== null;

    React.useEffect(() => {
        if (vehicle_id) {
            setData('vehicle_id', vehicle_id);
        }
    }, [vehicle_id]);

    const addReading = () => {
        post(route('odometer.store'), {
            data,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
            onError: (errors) => console.log(errors),
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    New Reading
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New reading</DialogTitle>
                    <DialogDescription>Log a new odometer reading.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <OdometerLogForm
                        formData={data}
                        setData={setData}
                        onSubmit={addReading}
                        processing={processing}
                        errors={errors}
                        vehicles={vehicles}
                        disableVehicleSelect={isScoped}
                    />
                </div>
                <DialogFooter>
                    <Button type="button" onClick={addReading} disabled={processing}>
                        {formType === 'edit' ? 'Save Changes' : 'Add Reading'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
