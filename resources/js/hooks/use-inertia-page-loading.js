// resources/js/hooks/use-inertia-page-loading.js

import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';

let hasBoundListeners = false;
let globalSetLoading = () => {};

export function useInertiaPageLoading() {
    const [isLoading, setIsLoading] = useState(false);

    // Expose current setState globally so events update the right instance
    useEffect(() => {
        globalSetLoading = setIsLoading;
    }, []);

    // Bind global Inertia listeners once
    useEffect(() => {
        if (hasBoundListeners) return;
        hasBoundListeners = true;

        Inertia.on('start', () => {
            if (event.detail.visit.prefetch) return;
            globalSetLoading(true);
        });

        Inertia.on('finish', () => {
            globalSetLoading(false);
        });
    }, []);

    return {
        isLoading,
        triggerLoading: () => setIsLoading(true), // for use in manual Link clicks
    };
}
