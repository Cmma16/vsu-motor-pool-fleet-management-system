import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QrCode } from 'lucide-react';
import React from 'react';

export function QRCodeModal({ vehicle_name, qr_code_path, asset_tag }) {
    const [open, setOpen] = React.useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <QrCode className="mr-2 h-4 w-4" />
                    View QR Code
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{vehicle_name}</DialogTitle>
                    <DialogDescription>Viewing the QR Code for the vehicle.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-4 py-4">
                    <img src={`/${qr_code_path}`} alt="QR Code" />
                </div>
                <DialogFooter className="flex justify-center">
                    <a
                        href={`/storage/qr-codes/${asset_tag}.png`}
                        download={`${asset_tag}_qr.png`}
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Download QR Code
                    </a>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
