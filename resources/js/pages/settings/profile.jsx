import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

const pageDetails = {
    title: '',
    description: '',
};

export default function Profile({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        first_name: auth.user.first_name,
        middle_name: auth.user.middle_name,
        last_name: auth.user.last_name,
        contact_number: auth.user.contact_number,
        address_details: auth.user.address_details,
        province: auth.user.province,
        city: auth.user.city,
        barangay: auth.user.barangay,
        email: auth.user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails} showQuickActions={false}>
            {console.log(auth)}
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="first_name">First Name</Label>

                            <Input
                                id="first_name"
                                className="mt-1 block w-full"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="First name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="middle_name">Middle Name(Optional)</Label>

                            <Input
                                id="middle_name"
                                className="mt-1 block w-full"
                                value={data.middle_name}
                                onChange={(e) => setData('middle_name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Middle name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="last_name">Last Name</Label>

                            <Input
                                id="last_name"
                                className="mt-1 block w-full"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Last name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="contact_number">Contact Number</Label>
                            <Input
                                id="contact_number"
                                className="mt-1 block w-full"
                                value={data.contact_number}
                                onChange={(e) => setData('contact_number', e.target.value)}
                                required
                                autoComplete="tel"
                                placeholder="Contact number"
                            />
                            <InputError className="mt-2" message={errors.contact_number} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="province">Province</Label>
                            <Input
                                id="province"
                                className="mt-1 block w-full"
                                value={data.province}
                                onChange={(e) => setData('province', e.target.value)}
                                required
                                autoComplete="address-level1"
                                placeholder="Province"
                            />
                            <InputError className="mt-2" message={errors.province} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="city">City/Municipality/Town</Label>
                            <Input
                                id="city"
                                className="mt-1 block w-full"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                required
                                autoComplete="address-level2"
                                placeholder="City/Municipality/Town"
                            />
                            <InputError className="mt-2" message={errors.city} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="barangay">Barangay</Label>
                            <Input
                                id="barangay"
                                className="mt-1 block w-full"
                                value={data.barangay}
                                onChange={(e) => setData('barangay', e.target.value)}
                                required
                                autoComplete="address-level3"
                                placeholder="Barangay"
                            />
                            <InputError className="mt-2" message={errors.barangay} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address_details">Address Details (Optional)</Label>
                            <Input
                                id="address_details"
                                className="mt-1 block w-full"
                                value={data.address_details}
                                onChange={(e) => setData('address_details', e.target.value)}
                                autoComplete="address"
                                placeholder="Address details"
                            />
                            <InputError className="mt-2" message={errors.address_details} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
