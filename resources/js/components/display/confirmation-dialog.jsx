import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function ConfirmationDialog({ title, message, onConfirm, onCancel, triggerVariant, trigger }) {
    return (
        <Dialog>
            <DialogTrigger className={`rounded bg-${triggerVariant} px-3 text-white hover:bg-${triggerVariant}-600`}>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                    <div className="mt-4 flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="destructive">
                                No
                            </Button>
                        </DialogClose>
                        <Button
                            className="border-2 border-green-600 bg-green-600 transition-all hover:bg-transparent hover:text-black"
                            onClick={onConfirm}
                        >
                            Yes
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
