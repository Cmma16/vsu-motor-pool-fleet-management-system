import QRCodeScanner from '@/components/display/qr-code-scanner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QrCode } from 'lucide-react';
import React from 'react';

export function QRCodeScannerModal() {
    const [open, setOpen] = React.useState(false);
    const handleScanSuccess = (decodedText) => {
        alert(`QR Code Scanned: ${decodedText}`);
        // Here you can parse the decrypted text or navigate somewhere
    };

    const handleScanFailure = (error) => {
        console.warn('Scan failed:', error);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="group flex gap-3">
                    <span className="flex size-8 items-center justify-center rounded-4xl bg-white p-1.5 group-hover:bg-[#006600]">
                        <QrCode className="text-[#006600] group-hover:text-white" />
                    </span>
                    <div className="hidden w-40 flex-col text-left text-xs group-hover:text-[#006600] lg:flex">
                        <span className="font-bold">Scan QR Code</span>
                        <p>Scan the QR Code to retrieve the vehicle information.</p>
                    </div>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Scan QR Code</DialogTitle>
                    <DialogDescription>Scan the QR Code to retrieve the vehicle information.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-4 py-4">
                    <QRCodeScanner onScanSuccess={handleScanSuccess} />
                </div>
                <DialogFooter className="flex justify-center">
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
