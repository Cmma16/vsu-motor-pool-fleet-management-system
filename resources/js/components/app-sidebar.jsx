import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { BookOpen, ChartColumnBig, DrillIcon, Folder, LayoutGrid, LucidePuzzle, TruckIcon, Users, WrenchIcon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Vehicles',
        href: 'vehicles',
        icon: TruckIcon,
        children: [
            { title: 'List', href: '/vehicles/list' },
            { title: 'Assignments', href: '/vehicles/assignments' },
        ],
    },
    {
        title: 'Repairs',
        href: '#',
        icon: WrenchIcon,
        children: [
            { title: 'All', href: '#' },
            { title: 'Ongoing', href: '#' },
            { title: 'Pending', href: '#' },
            { title: 'Completed', href: '#' },
        ],
    },
    {
        title: 'Maintenance',
        href: '#',
        icon: DrillIcon,
        children: [
            { title: 'All', href: '#' },
            { title: 'Due soon', href: '#' },
            { title: 'Overdue', href: '#' },
        ],
    },
    {
        title: 'Parts',
        href: '#',
        icon: LucidePuzzle,
    },
    {
        title: 'Personnel',
        href: '#',
        icon: Users,
    },
    {
        title: 'Reports',
        href: '#',
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
