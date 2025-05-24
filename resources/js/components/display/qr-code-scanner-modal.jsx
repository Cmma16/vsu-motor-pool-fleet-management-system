import QRCodeScanner from '@/components/display/qr-code-scanner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { QrCode } from 'lucide-react';
import React from 'react';

export function QRCodeScannerModal() {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onNewScanResult = async (decodedText, decodedResult) => {
        {
            console.log({
                title: 'Scanning QR Code',
                description: 'Scanning QR Code',
                decodedText: decodedText,
                decodedResult: decodedResult,
            });
        }
        setIsLoading(true);
        router.post(
            route('vehicles.scan-qr'),
            {
                encrypted: decodedText,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                },
                onError: (error) => {
                    console.log({
                        title: 'Scan Failed',
                        description: 'Failed to scan QR code. Please try again.',
                        error: error,
                    });
                    setOpen(false);
                },
            },
        );
    };

    const handleScanFailure = (error) => {
        const now = Date.now();

        // Ignore repeated errors within 3 seconds
        if (now - lastErrorTime < 3000) return;

        // Ignore harmless "NotFoundException" (no QR in frame)
        if (error?.name === 'NotFoundException') return;

        console.warn('Scan failed:', error);
        lastErrorTime = now;
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
                    {isLoading ? (
                        <div className="flex items-center justify-center p-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#006600]"></div>
                        </div>
                    ) : (
                        <QRCodeScanner
                            fps={10}
                            qrbox={250}
                            disableFlip={false}
                            qrCodeSuccessCallback={onNewScanResult}
                            qrCodeErrorCallback={handleScanFailure}
                        />
                    )}
                </div>
                <DialogFooter className="flex justify-center">
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
