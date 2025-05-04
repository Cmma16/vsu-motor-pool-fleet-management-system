import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { BookOpen, ChartColumnBig, DrillIcon, Folder, HandHelpingIcon, LayoutGrid, LucidePuzzle, TruckIcon, Users, WrenchIcon } from 'lucide-react';
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
        title: 'Repairs',
        href: '#',
        icon: WrenchIcon,
        children: [
            { title: 'All', href: '/repairs' },
            { title: 'Ongoing', href: '/repairs?status=ongoing' },
            { title: 'Pending', href: '/repairs?status=pending' },
            { title: 'Completed', href: '/repairs?status=completed' },
            { title: 'Cancelled', href: '/repairs?status=cancelled' },
        ],
    },
    {
        title: 'Maintenance',
        href: '#',
        icon: DrillIcon,
        children: [
            { title: 'All', href: '/maintenance' },
            { title: 'Due soon', href: '#' },
            { title: 'Overdue', href: '#' },
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
