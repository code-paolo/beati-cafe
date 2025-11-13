'use client';

import * as React from 'react';
import type { ToastProps } from '@/components/ui/toast';

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void;
} | undefined>(undefined);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    // Fallback implementation
    return {
      toast: (props: ToastProps) => {
        console.log('Toast:', props);
      },
    };
  }
  return context;
}

export { ToastContext };





