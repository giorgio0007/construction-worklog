import type { ReactNode } from 'react';
import { QueryProvider } from './query-provider';
import { AppToaster } from '@shared/ui/toaster/toaster';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      {children}
      <AppToaster />
    </QueryProvider>
  );
};
