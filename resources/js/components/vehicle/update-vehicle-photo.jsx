import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function UpdateVehiclePhoto({ vehicleId, currentPhoto }) {
    const { data, setData, post, processing, errors } = useForm({
        image: null,
    });
    const submit = (e) => {
        e.preventDefault();
        post(`/vehicles/${vehicleId}/update-photo`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Vehicle photo updated successfully!');
            },
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">Update Vehicle Photo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Vehicle Photo</DialogTitle>
                    <DialogDescription>This will replace the current vehicle photo. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <form onSubmit={submit}>
                        <div>
                            <Label>Current Photo</Label>
                            <img src={`/storage/${currentPhoto}`} alt="Vehicle" className="mb-2 object-cover" />
                        </div>

                        <div>
                            <Input type="file" onChange={(e) => setData('image', e.target.files[0])} />
                            {errors.photo && <div className="text-sm text-red-500">{errors.photo}</div>}
                        </div>

                        <div className="py-2">
                            <Button type="submit" disabled={processing}>
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {processing ? 'Uploading...' : 'Update Photo'}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
