import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InfoIcon } from 'lucide-react';
import React from 'react';

export default function VerifyPersonnelModal({ onConfirm, personnel, roles }) {
    const [hasRole, setHasRole] = React.useState(false);
    const [selectedRoleId, setSelectedRoleId] = React.useState(personnel.role_id || '');

    const handleRoleChange = (newRoleId) => {
        setSelectedRoleId(newRoleId);
        setHasRole(true);
    };
    return (
        <Dialog>
            <DialogTrigger className="rounded bg-green-700 px-3 text-white hover:bg-green-600">Verify</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Verifying Personnel Registration</DialogTitle>
                    <DialogDescription>
                        <div className="flex items-start gap-2 rounded-md bg-green-50 p-2 align-middle text-green-800">
                            <InfoIcon className="mt-0.5 h-10 w-10 text-green-400" />
                            <span>
                                To verify this personnel, please assign a role first. A personnel must have a role to determine their level of access
                                within the system.
                            </span>
                        </div>
                    </DialogDescription>
                    <div className="text-left">
                        <Select value={selectedRoleId} onValueChange={handleRoleChange}>
                            <SelectTrigger className="border-black text-black">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role.role_id} value={String(role.role_id)}>
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="destructive">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            className="border-2 border-green-600 bg-green-600 transition-all hover:bg-transparent hover:text-black"
                            disabled={!hasRole}
                            onClick={() => onConfirm(selectedRoleId)}
                        >
                            Verify
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
