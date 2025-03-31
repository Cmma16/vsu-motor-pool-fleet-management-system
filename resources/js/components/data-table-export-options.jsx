import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

//need to add props for reusablity purposes
export function DataTableExportOptions() {
    return (
        <Menubar className="bg-white hover:bg-[#006600] hover:text-white">
            <MenubarMenu>
                <MenubarTrigger>Export</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Export to PDF</MenubarItem>
                    <MenubarItem>Export to CSV</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
