import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import {
    ChartColumnBig,
    HandHelpingIcon,
    LayoutGrid,
    LucidePuzzle,
    MapPinIcon,
    NotebookPen,
    Stethoscope,
    TruckIcon,
    Users,
    WrenchIcon,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    { title: 'My Requests', href: '/services/requests?status=my-requests', icon: HandHelpingIcon, allowedRoles: ['Driver'] },
    {
        title: 'Services Requests',
        href: '/services',
        icon: HandHelpingIcon,
        allowedRoles: ['Admin', 'Mechanic', 'Manager'],
        children: [
            { title: 'All Requests', href: '/services/requests', allowedRoles: ['Admin', 'Mechanic', 'Manager'] },
            { title: 'Pending', href: '/services/requests?status=pending', allowedRoles: ['Admin', 'Manager'] },
            { title: 'Received', href: '/services/requests?status=received', allowedRoles: ['Mechanic'] },
            { title: 'Inspected', href: '/services/requests?status=inspected', allowedRoles: ['Admin', 'Manager'] },
            { title: 'Approved', href: '/services/requests?status=approved', allowedRoles: ['Mechanic'] },
            { title: 'Conducted', href: '/services/requests?status=conducted', allowedRoles: ['Manager'] },
            { title: 'Completed', href: '/services/requests?status=completed', allowedRoles: ['Admin', 'Mechanic', 'Manager'] },
            { title: 'Cancelled', href: '/services/requests?status=cancelled', allowedRoles: ['Admin', 'Mechanic', 'Manager'] },
            // { title: 'Completed', href: '/services/completed', allowedRoles: ['Admin', 'Mechanic', 'Manager'] },
        ],
    },
    {
        title: 'Service Request Inspection',
        href: '/services/request-inspections',
        icon: Stethoscope,
        allowedRoles: ['Admin', 'Mechanic', 'Manager'],
    },
    {
        title: 'Vehicles',
        href: '/vehicles',
        icon: TruckIcon,
        allowedRoles: ['Admin', 'Manager'],
    },
    {
        title: 'Trips',
        href: '/vehicles/trips',
        icon: MapPinIcon,
        allowedRoles: ['Admin', 'Driver', 'Manager'],
    },
    { title: 'Maintenance Plans', href: '/plans', icon: NotebookPen, allowedRoles: ['Admin', 'Manager', 'Mechanic'] },
    {
        title: 'Service Records',
        href: '#',
        icon: WrenchIcon,
        allowedRoles: ['Admin', 'Mechanic', 'Manager'],
        children: [
            { title: 'Preventive Maintenance Records', href: '/preventive', allowedRoles: ['Admin', 'Manager', 'Mechanic'] },
            { title: 'Planned Maintenance Records', href: '/maintenance', allowedRoles: ['Admin', 'Mechanic', 'Manager'] },
            { title: 'Repair Records', href: '/repairs', allowedRoles: ['Admin', 'Mechanic', 'Manager'] },
        ],
    },
    {
        title: 'Parts',
        href: '/parts',
        icon: LucidePuzzle,
        allowedRoles: ['Admin', 'Manager'],
    },
    {
        title: 'Personnel',
        href: '/personnel',
        icon: Users,
        allowedRoles: ['Admin'],
    },
    // {
    //     title: 'Odometer Logs',
    //     href: '/odometer',
    //     icon: Gauge,
    //     allowedRoles: ['Admin', 'Manager'],
    // },
    { title: 'Fleet Analytics', href: '/reports/fleet-analytics', icon: ChartColumnBig, allowedRoles: ['Admin', 'Manager'] },
    // {
    //     title: 'Reports',
    //     href: '/reports',
    //     icon: ChartColumnBig,
    //     allowedRoles: ['Admin', 'Manager'],
    //     children: [
    //         // { title: 'Report Generation', href: '/reports', allowedRoles: ['Admin', 'Manager'] },
    //         { title: 'Fleet Analytics', href: '/reports/fleet-analytics',
    //             icon: ChartColumnBig, allowedRoles: ['Admin', 'Manager'] },
    //     ],
    // },
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
