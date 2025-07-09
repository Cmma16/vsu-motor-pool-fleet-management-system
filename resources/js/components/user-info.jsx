import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useInitials } from '@/hooks/use-initials';
import { AlertTriangle } from 'lucide-react';

export function UserInfo({ user, showEmail = false }) {
    const getInitials = useInitials();

    const isIncompleteProfile = !user.barangay || !user.city || !user.province || !user.contact_number;

    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarImage src={user.avatar} alt={user.first_name} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(user.first_name)}
                    </AvatarFallback>
                </Avatar>

                {isIncompleteProfile && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="absolute -top-0 -left-2 rounded-full bg-yellow-100 p-1 shadow-sm">
                                    <AlertTriangle className="h-3 w-3 text-yellow-600" />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>Please complete your profile information.</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                    {`${user.first_name} ${user.last_name}`} {user.name_extension || ''}
                </span>
                <span className="text-muted-foreground truncate text-sm">{user.role.name}</span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
            </div>
        </div>
    );
}
