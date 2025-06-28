// resources/js/hooks/use-inertia-page-loading.js
import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';

let hasBoundListeners = false;
let globalSetLoading = () => {};

export function useInertiaPageLoading() {
    const [isLoading, setIsLoading] = useState(false);

    // Keep reference to local state updater
    useEffect(() => {
        globalSetLoading = setIsLoading;
    }, []);

    // Add listeners only once
    useEffect(() => {
        if (hasBoundListeners) return;

        hasBoundListeners = true;

        Inertia.on('start', () => {
            globalSetLoading(true);
        });

        Inertia.on('finish', () => {
            globalSetLoading(false);
        });
    }, []);

    return isLoading;
}
