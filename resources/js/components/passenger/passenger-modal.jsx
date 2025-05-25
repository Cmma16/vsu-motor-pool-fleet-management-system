import PassengerForm from '@/components/passenger/passenger-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

export function PassengerModal({ trip_id, formType = 'add', passenger = null }) {
    const [open, setOpen] = React.useState(false);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        trip_id: trip_id ?? '',
        name: passenger ? passenger.name : '',
        affiliation: passenger ? passenger.affiliation : '',
        contact_number: passenger ? passenger.contact_number : '',
        is_party_head: passenger ? passenger.is_party_head : false,
    });

    React.useEffect(() => {
        if (passenger) {
            setData('name', passenger.name);
            setData('affiliation', passenger.affiliation);
            setData('contact_number', passenger.contact_number);
            setData('is_party_head', passenger.is_party_head);
        }
    }, [passenger]);

    const handleSubmit = () => {
        console.log(data);
        if (formType === 'edit') {
            put(route('passengers.update', passenger.id), {
                onSuccess: () => {
                    setOpen(false);
                    toast.success('Passenger updated successfully');
                },
                onError: (errors) => {
                    toast.error('Failed to update passenger');
                    console.log(errors);
                },
            });
        } else {
            post(route('passengers.store'), {
                onSuccess: () => {
                    setOpen(false);
                    toast.success('Passenger added successfully');
                },
                onError: (errors) => {
                    toast.error('Failed to add passenger');
                    console.log(errors);
                },
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
                    <DialogTitle>{formType === 'edit' ? 'Edit Passenger' : 'Add Passenger'}</DialogTitle>
                    <DialogDescription>{formType === 'edit' ? 'Edit the passenger details.' : 'Add a passenger to the trip.'}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <PassengerForm formData={data} setData={setData} processing={processing} errors={errors} />
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSubmit} disabled={processing}>
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {formType === 'edit' ? 'Save Changes' : 'Add Passenger'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
