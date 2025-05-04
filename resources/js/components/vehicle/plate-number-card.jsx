import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';

export function PlateNumberCard({ plate_number }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Vehicle License</CardTitle>
                <CardDescription>Details about the vehicle's license.</CardDescription>
            </CardHeader>
            <CardContent className="">
                <div className="mt-2 flex flex-col space-y-2">
                    <Label htmlFor="expiration_date">Expiration Date</Label>
                    <span>May 02, 2026</span>
                    <Link href={`#`} className="w-full rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]">
                        Edit
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
