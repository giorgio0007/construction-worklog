import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800',
        outline:
          'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100',
        secondary:
          'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300',
        ghost:
          'text-slate-700 hover:bg-slate-100 active:bg-slate-200',
        destructive:
          'bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200 focus-visible:ring-red-500',
        link: 'text-indigo-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 min-h-10 gap-2 px-4',
        sm: 'h-9 min-h-9 gap-1.5 rounded-md px-3 text-sm',
        lg: 'h-11 min-h-11 gap-2 px-5 text-base',
        icon: 'size-10 min-h-10 min-w-10',
        'icon-sm': 'size-9 min-h-9 min-w-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
