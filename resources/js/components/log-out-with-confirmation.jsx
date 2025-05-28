import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

export default function LogoutWithConfirmation({ cleanup }) {
    const [open, setOpen] = useState(false);
    const { post } = useForm();

    const handleLogout = () => {
        // Blur focused element before closing modal
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        cleanup();
        post(route('logout'));
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                    <LogOut className="mr-2" />
                    Log out
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to log out?</DialogTitle>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleLogout}>
                        Yes, Log out
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
