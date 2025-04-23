import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export function OdometerReadingCard({ odometer_reading }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Odometer Reading</CardTitle>
                <CardDescription>Current mileage of the vehicle.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <span className="text-center font-bold">{odometer_reading} km</span>
                    <Link href={`#`} className="rounded-md bg-[#006600] px-3 text-center text-white hover:bg-[#005500]">
                        Update
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
