import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-10 min-h-10 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20 md:text-sm',
        className
      )}
      {...props}
    />
  );
}

export { Input };
