import InfoIcon from '@/assets/icons/InfoIcon.svg?react';
import {
  CircleCheckIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Toaster } from 'sonner';

export default function Toast() {
  return (
    <Toaster
      icons={{
        success: <CircleCheckIcon className='size-6' />,
        info: <InfoIcon className='size-6' />,
        warning: <TriangleAlertIcon className='size-6' />,
        error: <OctagonXIcon className='size-6' />,
        loading: <Loader2Icon className='size-6 animate-spin' />,
      }}
      position='bottom-center'
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `
            group toast flex items-center rounded-2xl gap-2 p-2 shadow-[0px_15px_50px_-12px_rgba(0,0,0,0.05)] text-md text-text-inverse font-semibold w-auto max-w-[90vw] font-pretendard
            md:gap-[10px] md:text-base md:p-3 md:gap-[10px]
          `,
          actionButton: `
            ml-auto inline-flex py-2 px-3 shrink-0 rounded-lg bg-bg-primary font-semibold text-md shrink-0 text-default
            md: px-5
            group-data-[type="info"]:text-primary
            group-data-[type="success"]:text-green-500
            group-data-[type="warning"]:text-yellow-500
            group-data-[type="error"]:text-red-500
          `,
          cancelButton:
            'inline-flex h-8 shrink-0 items-center justify-center rounded-md bg-muted px-3 text-xs font-medium text-muted-foreground',
          closeButton:
            'absolute right-3 top-3 rounded-full p-1.5 text-foreground/50 opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2',
          loader: '!static !transform-none',
          success: 'bg-green-500',
          info: 'bg-primary',
          warning: 'bg-yellow-500',
          error: 'bg-red-500',
          loading: 'bg-black',
          icon: 'hidden h-6 w-6 shrink-0 md:block',
        },
      }}
    />
  );
}
