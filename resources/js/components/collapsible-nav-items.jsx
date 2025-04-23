import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export function CollapsibleNavItems({ item }) {
    const { url } = usePage();

    // Normalize URLs by removing trailing slashes for consistency
    const normalizePath = (path) => path.replace(/\/+$/, '');

    // Check if any sub-item is active (EXACT match for index pages, startsWith for deeper subroutes)
    const isActiveParent = item.children?.some(
        (child) =>
            normalizePath(url) === normalizePath(child.href) ||
            (child.href !== '/' && normalizePath(url).startsWith(normalizePath(child.href) + '/')),
    );

    return (
        <Collapsible key={item.title} asChild defaultOpen={isActiveParent} className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} isActive={isActiveParent}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.children?.map((child) => {
                            const isActiveSubItem = normalizePath(url) === normalizePath(child.href);
                            return (
                                <SidebarMenuSubItem key={child.title}>
                                    <SidebarMenuSubButton asChild isActive={isActiveSubItem}>
                                        <Link href={child.href} prefetch>
                                            <span>{child.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            );
                        })}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}
