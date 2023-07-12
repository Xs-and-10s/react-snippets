import { useEffect } from 'react';

export function useUnsavedChangesWarning(condition: boolean) {
  useEffect(() => {
    const beforeunloadHandler = (e: BeforeUnloadEvent) => {
      if (condition) {
        e.preventDefault();
        e.returnValue = true;
      }
    };

    window.addEventListener('beforeunload', beforeunloadHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeunloadHandler);
    };
  }, [condition]);
}

/**
 * * Example
 * useUnsavedChangesWarning(isDirty && !isSubmitting);
 */
