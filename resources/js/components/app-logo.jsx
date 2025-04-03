import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground mb-1 flex aspect-square size-28 items-center justify-center rounded-[100%] bg-[#00964f] fill-current p-3">
                <AppLogoIcon />
            </div>
            <div className="grid flex-1 text-center text-sm leading-tight">
                <span className="truncate font-semibold">VSU Motor Pool Services Office</span>
                <span className="truncate text-xs">Fleet Management System</span>
            </div>
        </>
    );
}
