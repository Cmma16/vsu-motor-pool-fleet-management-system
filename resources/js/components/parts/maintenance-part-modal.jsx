import UsedPartForm from '@/components/parts/used-part-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';

export function MaintenancePartModal({ maintenance_id, parts, formType = 'add', maintenancePart = null }) {
    const [open, setOpen] = React.useState(false);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        maintenance_id: maintenance_id ?? '',
        part_id: maintenancePart ? maintenancePart.part_id : '',
        quantity_used: maintenancePart ? maintenancePart.quantity_used : '',
        id: maintenancePart ? maintenancePart.id : '',
    });

    React.useEffect(() => {
        if (maintenancePart) {
            setData('part_id', maintenancePart.part_id);
            setData('quantity_used', maintenancePart.quantity_used);
            setData('id', maintenancePart.id);
        }
    }, [maintenancePart]);

    const handleSubmit = () => {
        if (formType === 'edit') {
            put(route('maintenance-parts.update', maintenancePart.id), {
                onSuccess: () => {
                    toast.success('Part usage record updated successfully');
                    setOpen(false);
                    reset();
                },
                onError: (errors) => console.log(errors),
            });
        } else {
            post(route('maintenance-parts.store'), {
                onSuccess: () => {
                    toast.success('Part usage record added successfully');
                    setOpen(false);
                    reset();
                },
                onError: (errors) => console.log(errors),
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#006600] text-white hover:bg-[#005500]" size="sm">
                    {formType === 'edit' ? 'Edit' : 'Add'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{formType === 'edit' ? 'Edit Part Usage' : 'Add Part Usage'}</DialogTitle>
                    <DialogDescription>
                        {formType === 'edit' ? 'Edit the part usage in the maintenance record.' : 'Add a part usage to the maintenance record.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <UsedPartForm
                        formData={data}
                        setData={setData}
                        processing={processing}
                        errors={errors}
                        parts={parts}
                        disablePartSelect={formType === 'edit'}
                        part_name={maintenancePart?.part_name}
                    />
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSubmit} disabled={processing}>
                        {formType === 'edit' ? 'Save Changes' : 'Add Part Usage'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
