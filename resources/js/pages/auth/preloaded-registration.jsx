import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AuthLayout from '@/layouts/auth-layout';
import axios from 'axios';
import { toast } from 'sonner';

export default function PreloadedRegistration() {
    //personally added feature
    const [stage, setStage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isClient, setIsClient] = React.useState(false);
    const { props } = usePage();

    //for handling the form
    const { data, setData, put, processing, errors, reset } = useForm({
        employee_id: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        name_extension: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '',
    });

    React.useEffect(() => {
        setData('role_id', isClient ? 5 : '');
    }, [isClient]);

    const handleCheck = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/check-user', {
                employee_id: data.employee_id,
            });

            if (response.data.status === 'ok') {
                const result = response.data.data;
                setData({
                    ...data, // retain what's already filled
                    employee_id: result.employee_id || '',
                    first_name: result.first_name || '',
                    middle_name: result.middle_name || '',
                    last_name: result.last_name || '',
                    name_extension: result.name_extension || '',
                    email: result.email || '', // read-only if preloaded?
                });
                setIsLoading(false);
                toast.success('Employee ID valid. Proceed with registration.');
                setStage(2);
            } else {
                setIsLoading(false);
                toast.error(response.data.message);
            }
        } catch (err) {
            if (err.response) {
                setIsLoading(false);
                toast.error(err.response.data.message);
            } else {
                setIsLoading(false);
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    const nextStage = (e) => {
        e.preventDefault(); // prevent form from submitting
        setStage((prev) => prev + 1);
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        put(route('preloaded-registration'), {
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
                <form className="mb-2 flex flex-col gap-6" onSubmit={handleCheck}>
                    <div className="grid gap-6">
                        {/* Employee ID */}
                        <div className="grid gap-2">
                            <Label htmlFor="employee_id">Employee ID</Label>
                            <Input
                                id="employee_id"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.employee_id}
                                onChange={(e) => setData('employee_id', e.target.value)}
                                disabled={processing}
                                placeholder="Employee ID"
                            />
                            <InputError message={errors.employee_id} />

                            <TextLink href={route('register')} className="ml-auto text-sm" tabIndex={2}>
                                Do not have an employee id?
                            </TextLink>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Button type="submit" disabled={isLoading} className="my-2 w-full" tabIndex={3}>
                            Next
                            {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        </Button>

                        <div className="text-muted-foreground text-center text-sm">
                            Already have an account?{' '}
                            <TextLink href={route('login')} tabIndex={4}>
                                Log in
                            </TextLink>
                        </div>
                    </div>
                </form>
            ) : stage === 2 ? (
                // Stage 2 - Personal Info
                <form className="mb-2 flex flex-col gap-6" onSubmit={nextStage}>
                    <div className="grid gap-6">
                        {/* First Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={5}
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                disabled
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
                                tabIndex={6}
                                value={data.middle_name}
                                onChange={(e) => setData('middle_name', e.target.value)}
                                disabled
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
                                tabIndex={7}
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                disabled
                                placeholder="Last Name"
                            />
                            <InputError message={errors.last_name} />
                        </div>

                        {/* Name Extension */}
                        <div className="grid gap-2">
                            <Label htmlFor="name_extension">Name Extension</Label>
                            <Input
                                id="name_extension"
                                type="text"
                                tabIndex={8}
                                value={data.name_extension}
                                onChange={(e) => setData('name_extension', e.target.value)}
                                disabled
                                placeholder="Name extension"
                            />
                            <InputError message={errors.name_extension} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <Button type="button" onClick={() => setStage(1)} className="mt-2" tabIndex={9} disabled={processing}>
                                Back
                            </Button>
                            <Button type="submit" className="mt-2" tabIndex={10} disabled={processing}>
                                Next
                            </Button>
                        </div>
                    </div>
                </form>
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
                                tabIndex={11}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing || data.email != ''}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Checkbox
                                className="border-black bg-white"
                                id="client"
                                name="client"
                                checked={isClient}
                                onClick={(e) => setIsClient(!isClient)}
                                tabIndex={12}
                            />
                            <Label htmlFor="client">
                                I am a{' '}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="cursor-help text-black underline dark:text-white">Client</span>
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-xs">
                                            Clients (also known as requestors) will only be able to submit trip requests, edit its details and view
                                            the status of their submitted trip requests.
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Label>
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
                </form>
            )}
        </AuthLayout>
    );
}
