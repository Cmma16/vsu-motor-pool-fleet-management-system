import '../css/app.css';

import { Toaster } from '@/components/ui/sonner';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                {/* <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-white">
                    <AppLoader />
                </div> */}
                <App {...props} />
                <Toaster position="bottom-center" richColors />
            </>,
        );
    },
    progress: {
        color: '#006600',
    },
});

// This will set light / dark mode on load...
initializeTheme();
