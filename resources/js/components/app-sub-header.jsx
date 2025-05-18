import { AppPageDescription } from '@/components/app-page-description';
import { QuickActionsPanel } from '@/components/quick-actions-panel';

export function AppSubHeader({ pageDetails, showQuickActions = true }) {
    return (
        <div className="flex items-center justify-between px-6">
            <AppPageDescription details={pageDetails} />
            {showQuickActions && <QuickActionsPanel />}
        </div>
    );
}
