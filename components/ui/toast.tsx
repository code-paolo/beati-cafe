'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'info' | 'warning' | 'error';
}

interface ToastContextType {
  toast: (props: ToastProps) => void;
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([]);

  const toast = React.useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...props, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999999] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'min-w-[350px] rounded-lg shadow-2xl p-4 border flex items-start gap-3 animate-in slide-in-from-top-5',
              {
                'bg-white border-gray-200': !t.variant || t.variant === 'default',
                'bg-green-50 border-green-500': t.variant === 'success',
                'bg-blue-50 border-blue-500': t.variant === 'info',
                'bg-yellow-50 border-yellow-500': t.variant === 'warning',
                'bg-red-50 border-red-500': t.variant === 'error',
              }
            )}
          >
            <div className="flex-1">
              {t.title && (
                <div className={cn(
                  'font-semibold',
                  {
                    'text-gray-900': !t.variant || t.variant === 'default',
                    'text-green-900': t.variant === 'success',
                    'text-blue-900': t.variant === 'info',
                    'text-yellow-900': t.variant === 'warning',
                    'text-red-900': t.variant === 'error',
                  }
                )}>{t.title}</div>
              )}
              {t.description && (
                <div className={cn(
                  'text-sm',
                  {
                    'text-gray-600': !t.variant || t.variant === 'default',
                    'text-green-700': t.variant === 'success',
                    'text-blue-700': t.variant === 'info',
                    'text-yellow-700': t.variant === 'warning',
                    'text-red-700': t.variant === 'error',
                  }
                )}>{t.description}</div>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className={cn(
                'hover:opacity-70',
                {
                  'text-gray-400': !t.variant || t.variant === 'default',
                  'text-green-600': t.variant === 'success',
                  'text-blue-600': t.variant === 'info',
                  'text-yellow-600': t.variant === 'warning',
                  'text-red-600': t.variant === 'error',
                }
              )}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function Toaster() {
  return null;
}

