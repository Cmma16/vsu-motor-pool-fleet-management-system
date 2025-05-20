import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { ChartColumnBig, Gauge, HandHelpingIcon, LayoutGrid, LucidePuzzle, MapPinIcon, TruckIcon, Users, WrenchIcon } from 'lucide-react';
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
            { title: 'For inspection', href: '/services/request-inspections', allowedRoles: ['Admin', 'Mechanic', 'Staff'] },
            { title: 'Completed', href: '/services/completed', allowedRoles: ['Admin', 'Mechanic', 'Staff'] },
        ],
    },
    {
        title: 'Vehicles',
        href: '/vehicles',
        icon: TruckIcon,
        allowedRoles: ['Admin', 'Staff'],
    },
    {
        title: 'Trips',
        href: '/vehicles/trips',
        icon: MapPinIcon,
        allowedRoles: ['Admin', 'Driver', 'Mechanic', 'Staff'],
    },
    {
        title: 'Repairs & Maintenance',
        href: '#',
        icon: WrenchIcon,
        allowedRoles: ['Admin', 'Mechanic', 'Staff'],
        children: [
            { title: 'Maintenance Plans', href: '/plans', allowedRoles: ['Admin', 'Staff'] },
            { title: 'Maintenance Records', href: '/maintenance', allowedRoles: ['Admin', 'Mechanic', 'Staff'] },
            { title: 'Repair Records', href: '/repairs', allowedRoles: ['Admin', 'Mechanic', 'Staff'] },
        ],
    },
    {
        title: 'Parts',
        href: '/parts',
        icon: LucidePuzzle,
        allowedRoles: ['Admin', 'Staff'],
    },
    {
        title: 'Personnel',
        href: '/personnel',
        icon: Users,
        allowedRoles: ['Admin'],
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
        allowedRoles: ['Admin', 'Staff'],
    },
];

const footerNavItems = [
    // {
    //     title: 'Repository',
    //     url: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     url: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },
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
