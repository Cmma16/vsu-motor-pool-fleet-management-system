import OdometerLogForm from '@/components/odometer/odometer-log-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export function EditOdometerDialog({ isOpen, onOpenChange, editingLog, vehicles }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        vehicle_id: '',
        reading: '',
        logged_at: '',
    });

    // Update form data when editingLog changes
    useEffect(() => {
        if (editingLog) {
            setData({
                vehicle_id: editingLog.vehicle_id,
                reading: editingLog.reading,
                logged_at: editingLog.logged_at,
            });
        }
    }, [editingLog]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('odometer.update', editingLog.odometer_id), {
            onSuccess: () => {
                onOpenChange(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {console.log(editingLog)}
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Odometer Reading</DialogTitle>
                    <DialogDescription>Make changes to the odometer reading. Click save when you're done.</DialogDescription>
                </DialogHeader>
                {editingLog && (
                    <form onSubmit={handleSubmit}>
                        <OdometerLogForm
                            formData={data}
                            setData={setData}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            disableVehicleSelect={true}
                        />
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
