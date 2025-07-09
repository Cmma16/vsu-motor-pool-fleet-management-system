import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function RemarksModal({ title, buttonLabel, action, actionType, data, setData }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const handleAction = () => {
        if (actionType === 'rejected' && !data.remarks.trim()) {
            setError('Remarks are required when rejecting a trip.');
            return;
        }

        setError('');
        action();
        setOpen(false); // Close dialog after action
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-64" variant={actionType === 'rejected' ? 'destructive' : 'default'}>
                    {buttonLabel}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {actionType === 'rejected' ? 'Reject' : ''} {title}
                    </DialogTitle>
                </DialogHeader>
                <Label htmlFor="remarks" className="text-sm font-medium">
                    Remarks {actionType === 'rejected' && <span className="text-red-600">*</span>}
                </Label>
                <Textarea
                    id="remarks"
                    value={data.remarks}
                    onChange={(e) => setData('remarks', e.target.value)}
                    placeholder={actionType === 'rejected' ? 'Please explain why the trip is being rejected.' : 'Optional notes for approval...'}
                    rows={4}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button className={actionType === 'rejected' ? 'bg-red-600 hover:bg-red-800' : 'bg-green-600'} onClick={handleAction}>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
