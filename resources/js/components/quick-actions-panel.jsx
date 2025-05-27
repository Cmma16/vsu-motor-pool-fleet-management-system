import { QRCodeScannerModal } from '@/components/display/qr-code-scanner-modal';
import { router } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';

export function QuickActionsPanel() {
    const handleRefresh = () => {
        router.reload({
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <>
            <div className="flex gap-2 p-4">
                <QRCodeScannerModal />
                <button onClick={handleRefresh} className="group flex gap-3">
                    <span className="flex size-8 items-center justify-center rounded-4xl bg-white p-1.5 group-hover:bg-[#006600]">
                        <RefreshCw className="text-[#006600] group-hover:text-white" />
                    </span>
                    <div className="hidden w-40 flex-col text-left text-xs group-hover:text-[#006600] lg:flex">
                        <span className="font-bold">Refresh</span>
                        <p>Reload to get the latest data and updates from the system.</p>
                    </div>
                </button>
            </div>
        </>
    );
}
