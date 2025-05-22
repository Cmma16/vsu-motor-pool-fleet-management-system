import { QRCodeScannerModal } from '@/components/display/qr-code-scanner-modal';
import { Plus } from 'lucide-react';
export function QuickActionsPanel() {
    return (
        <>
            <div className="flex gap-2 p-4">
                <QRCodeScannerModal />
                <button className="group flex gap-3">
                    <span className="flex size-8 items-center justify-center rounded-4xl bg-white p-1.5 group-hover:bg-[#006600]">
                        <Plus className="text-[#006600] group-hover:text-white" />
                    </span>
                    <div className="hidden w-40 flex-col text-left text-xs group-hover:text-[#006600] lg:flex">
                        <span className="font-bold">Quick Add</span>
                        <p>Easily add a vehicle, personnel, repair, etc.</p>
                    </div>
                </button>
            </div>
        </>
    );
}
