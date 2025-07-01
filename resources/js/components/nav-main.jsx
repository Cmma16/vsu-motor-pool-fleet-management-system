import { CollapsibleNavItems } from '@/components/collapsible-nav-items';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }) {
    const page = usePage();
    const userRole = page.props.auth.user.role.name;

    // Filter items based on user role
    const filteredItems = items.filter((item) => {
        // If item has no allowedRoles, show it to everyone
        if (!item.allowedRoles) return true;
        // Check if user's role is in the allowedRoles array
        return item.allowedRoles.includes(userRole);
    });

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Fleet Management</SidebarGroupLabel>
            <SidebarMenu>
                {filteredItems.map((item) =>
                    item.children ? (
                        // Filter children based on user role
                        <CollapsibleNavItems
                            key={item.title}
                            item={{
                                ...item,
                                children: item.children.filter((child) => !child.allowedRoles || child.allowedRoles.includes(userRole)),
                            }}
                        />
                    ) : (
                        // Regular sidebar items
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}>
                                <Link href={item.href}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
