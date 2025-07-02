import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

import { AddressForm } from '@/components/forms/address-form';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { toast } from 'sonner';

export default function Register() {
    //personally added feature
    const [stage, setStage] = React.useState(1);

    //for handling the form
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        contact_number: '',
        province: '',
        city: '',
        barangay: '',
        address_details: '',
        email: '',
        password: '',
        password_confirmation: '',
        //role_id: 2, // Adding default role_id for regular users, only a stopgap
    });

    const nextStage = (e) => {
        e.preventDefault(); // prevent form from submitting
        setStage((prev) => prev + 1);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onSuccess: () => {
                toast.success('Registration Successful', {
                    description: 'You can only log in once you verify your email and the admin verifies your registration.',
                });
            },
            onError: (errors) => {
                console.error('Registration failed:', errors);
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />

            {stage === 1 ? (
                // Stage 1 - Personal Info
                <form className="flex flex-col gap-6" onSubmit={nextStage}>
                    <div className="grid gap-6">
                        {/* First Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                disabled={processing}
                                placeholder="First Name"
                            />
                            <InputError message={errors.first_name} />
                        </div>

                        {/* Middle Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="middle_name">Middle Name</Label>
                            <Input
                                id="middle_name"
                                type="text"
                                tabIndex={2}
                                value={data.middle_name}
                                onChange={(e) => setData('middle_name', e.target.value)}
                                disabled={processing}
                                placeholder="Middle Name (Optional)"
                            />
                            <InputError message={errors.middle_name} />
                        </div>

                        {/* Last Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                type="text"
                                required
                                tabIndex={3}
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                disabled={processing}
                                placeholder="Last Name"
                            />
                            <InputError message={errors.last_name} />
                        </div>

                        {/* Contact Number */}
                        <div className="grid gap-2">
                            <Label htmlFor="contact_number">Contact Number</Label>
                            <Input
                                id="contact_number"
                                type="text"
                                required
                                tabIndex={4}
                                value={data.contact_number}
                                onChange={(e) => setData('contact_number', e.target.value)}
                                disabled={processing}
                                placeholder="Contact Number"
                            />
                            <InputError message={errors.contact_number} />
                        </div>
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        Next
                    </Button>

                    <div className="text-muted-foreground text-center text-sm">
                        Already have an account?{' '}
                        <TextLink href={route('login')} tabIndex={6}>
                            Log in
                        </TextLink>
                    </div>
                </form>
            ) : stage === 2 ? (
                // Stage 2 - Address Info
                <AddressForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    nextStage={nextStage}
                    previousStage={() => setStage(1)}
                    processing={processing}
                />
            ) : (
                // Stage 3 - Account Info
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={12}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={13}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Confirm Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={14}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <Button type="button" onClick={() => setStage(2)} className="mt-2" tabIndex={15} disabled={processing}>
                            Back
                        </Button>
                        <Button type="submit" className="mt-2" tabIndex={16} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} Create account
                        </Button>
                    </div>

                    <div className="text-muted-foreground text-center text-sm">
                        Already have an account?{' '}
                        <TextLink href={route('login')} tabIndex={17}>
                            Log in
                        </TextLink>
                    </div>
                </form>
            )}
        </AuthLayout>
    );
}
