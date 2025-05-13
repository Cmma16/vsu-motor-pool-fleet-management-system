import { Head, Link, usePage } from '@inertiajs/react';
import { Car, ClipboardList, Shield, Wrench } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b px-2 backdrop-blur">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Car className="text-primary h-6 w-6" />
                        <span className="text-xl font-bold">UniFleet</span>
                    </div>
                </div>
            </header>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <main className="flex-1">
                    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-20">
                        <div className="container px-4 md:px-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                                <div className="flex flex-col justify-center space-y-4">
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                            Visayas State University Motor Pool Services Office
                                        </h1>
                                        <p className="text-muted-foreground max-w-[600px] md:text-xl">
                                            Streamlined fleet management system for motor pool personnel
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                        {auth.user ? (
                                            <Link
                                                href={route('dashboard')}
                                                className="inline-flex h-12 items-center justify-center rounded-sm border border-[#19140035] bg-[#E8F0FE] px-8 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                            >
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route('login')}
                                                    className="inline-flex h-12 items-center justify-center rounded-sm border border-transparent bg-[#065601] px-8 py-1.5 text-sm leading-normal text-white hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                                >
                                                    Log in
                                                </Link>
                                                <Link
                                                    href={route('register')}
                                                    className="inline-flex h-12 items-center justify-center rounded-sm border border-[#19140035] bg-[#E8F0FE] px-8 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                                >
                                                    Register
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <img
                                        src="/vsu-cover-page.jpg"
                                        width={550}
                                        height={550}
                                        alt="Fleet management illustration"
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
                        <div className="container px-4 md:px-6">
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simplify Vehicle Management</h2>
                                    <p className="text-muted-foreground max-w-[700px] md:text-xl">
                                        Our system helps motor pool personnel efficiently manage vehicle assignments and maintenance
                                    </p>
                                </div>
                            </div>
                            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-background hover:border-primary/20 hover:bg-background/80 flex flex-col items-center space-y-2 rounded-lg border p-6 text-center shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                                        <Car className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold">Vehicle Assignment</h3>
                                    <p className="text-muted-foreground text-sm">Easily assign vehicles to university departments and staff</p>
                                </div>
                                <div className="bg-background hover:border-primary/20 hover:bg-background/80 flex flex-col items-center space-y-2 rounded-lg border p-6 text-center shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                                        <ClipboardList className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold">Trip Tracking</h3>
                                    <p className="text-muted-foreground text-sm">Monitor all active trips and vehicle usage</p>
                                </div>
                                <div className="bg-background hover:border-primary/20 hover:bg-background/80 flex flex-col items-center space-y-2 rounded-lg border p-6 text-center shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                                        <Wrench className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold">Maintenance</h3>
                                    <p className="text-muted-foreground text-sm">Schedule and track vehicle maintenance and repairs</p>
                                </div>
                                <div className="bg-background hover:border-primary/20 hover:bg-background/80 flex flex-col items-center space-y-2 rounded-lg border p-6 text-center shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                                        <Shield className="text-primary h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold">Secure Access</h3>
                                    <p className="text-muted-foreground text-sm">Role-based access for authorized personnel only</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {!auth.user && (
                        <section className="w-full py-12 md:py-24 lg:py-32">
                            <div className="container px-4 md:px-6">
                                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                                        <p className="text-muted-foreground max-w-[600px] md:text-xl">
                                            Access the fleet management system to streamline your motor pool operations
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                        <Link
                                            href={route('login')}
                                            className="inline-flex h-12 items-center justify-center rounded-sm border border-transparent bg-[#065601] px-8 py-1.5 text-sm leading-normal text-white hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex h-12 items-center justify-center rounded-sm border border-[#19140035] bg-[#E8F0FE] px-8 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </div>

            <footer className="bg-background border-t">
                <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                    <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
                        <Car className="h-5 w-5" />
                        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
                            &copy; {new Date().getFullYear()} University Motor Pool Services. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground text-sm hover:underline">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-muted-foreground text-sm hover:underline">
                            Privacy
                        </Link>
                        <Link href="#" className="text-muted-foreground text-sm hover:underline">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
