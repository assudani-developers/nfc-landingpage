import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * React 19 / Next.js 16 compliant client-mount hook using useSyncExternalStore.
 * Avoids calling setState synchronously inside useEffect which causes cascading renders
 * and triggers react-hooks/set-state-in-effect ESLint errors.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

