// src/routes/loadable.tsx (optional helper)
import loadable from '@loadable/component';
import React from 'react';

export const withLoader = <P extends object>(
    importer: () => Promise<{ default: React.ComponentType<P> }>
) =>
    loadable(importer, {
        fallback: <div></div>,   // per-page fallback
    });
