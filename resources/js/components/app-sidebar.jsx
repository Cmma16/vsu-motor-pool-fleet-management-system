import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { BookOpen, ChartColumnBig, Folder, Gauge, HandHelpingIcon, LayoutGrid, LucidePuzzle, TruckIcon, Users, WrenchIcon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Services',
        href: '/services',
        icon: HandHelpingIcon,
        children: [
            { title: 'Requests', href: '/services/requests' },
            { title: 'For inspection', href: '/services/request-inspections' },
            { title: 'Completed', href: '/services/completed' },
        ],
    },
    {
        title: 'Vehicles',
        href: 'vehicles',
        icon: TruckIcon,
        children: [
            { title: 'List', href: '/vehicles' },
            { title: 'Trips', href: '/vehicles/trips' },
        ],
    },
    {
        title: 'Repairs & Maintenance',
        href: '#',
        icon: WrenchIcon,
        children: [
            { title: 'Maintenance Plans', href: '/plans' },
            { title: 'Maintenance Records', href: '/maintenance' },
            { title: 'Repair Records', href: '/repairs' },
        ],
    },
    {
        title: 'Parts',
        href: '/parts',
        icon: LucidePuzzle,
    },
    {
        title: 'Personnel',
        href: '/personnel',
        icon: Users,
    },
    {
        title: 'Odometer Logs',
        href: '/odometer',
        icon: Gauge,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: ChartColumnBig,
    },
];

const footerNavItems = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={null} asChild>
                            <Link href="/dashboard" prefetch className="flex flex-col items-center">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
