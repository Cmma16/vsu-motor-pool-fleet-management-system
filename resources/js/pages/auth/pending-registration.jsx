// Components
import { Head } from '@inertiajs/react';

import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function PendingRegistration() {
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash['verification-status']) {
            toast.warning(flash['verification-status']);
        }
    }, [flash['verification-status']]);
    return (
        <AuthLayout title="Registration Pending" description="The admin has not yet verified your registration.">
            <Head title="Registration Pending" />

            <div className="space-y-6 text-center">
                <p>Please wait for the admin to verify your registration.</p>
                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    Log out
                </TextLink>
            </div>
        </AuthLayout>
    );
}
