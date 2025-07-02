import UsedPartForm from '@/components/parts/used-part-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import React from 'react';

export function RepairPartModal({ repair_id, parts, formType = 'add', repairPart = null }) {
    const [open, setOpen] = React.useState(false);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        repair_id: repair_id ?? '',
        part_id: repairPart ? repairPart.part_id : '',
        quantity_used: repairPart ? repairPart.quantity_used : '',
        id: repairPart ? repairPart.id : '',
    });

    React.useEffect(() => {
        if (repairPart) {
            setData('part_id', repairPart.part_id);
            setData('quantity_used', repairPart.quantity_used);
            setData('id', repairPart.id);
        }
    }, [repairPart]);

    const handleSubmit = () => {
        if (formType === 'edit') {
            put(route('repair-parts.update', repairPart.id), {
                onSuccess: () => setOpen(false),
                onError: (errors) => console.log(errors),
            });
        } else {
            post(route('repair-parts.store'), {
                onSuccess: () => setOpen(false),
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
                        {formType === 'edit' ? 'Edit the part usage in the repair record.' : 'Add a part usage to the repair record.'}
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
                        part_name={repairPart?.part_name}
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
