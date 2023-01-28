import { createStandaloneToast } from '@chakra-ui/react';
import { ReactNode } from 'react';

const { toast } = createStandaloneToast();

interface ToastSettings {
  description: ReactNode;
  duration: number;
  hasCloseButton: boolean;
  variants: 'solid' | 'subtle' | 'left-accent' | 'top-accent';
  positions:
    | 'top'
    | 'top-right'
    | 'top-left'
    | 'bottom'
    | 'bottom-right'
    | 'bottom-left';
}

const toaster = {
  success: (title?: string, settings?: ToastSettings) =>
    toast({
      title,
      status: 'success',
      description: settings?.description || null,
      duration: settings?.duration || 1000,
      isClosable: settings?.hasCloseButton || true,
      variant: settings?.variants || 'left-accent',
      position: settings?.positions || 'top',
    }),

  danger: (title?: string, settings?: ToastSettings) =>
    toast({
      title,
      status: 'error',
      description: settings?.description || null,
      duration: settings?.duration || 1000,
      isClosable: settings?.hasCloseButton || true,
      variant: settings?.variants || 'left-accent',
      position: settings?.positions || 'top',
    }),

  warning: (title?: string, settings?: ToastSettings) =>
    toast({
      title,
      status: 'warning',
      description: settings?.description || null,
      duration: settings?.duration || 1000,
      isClosable: settings?.hasCloseButton || true,
      variant: settings?.variants || 'left-accent',
      position: settings?.positions || 'top',
    }),

  info: (title?: string, settings?: ToastSettings) =>
    toast({
      title,
      status: 'info',
      description: settings?.description || null,
      duration: settings?.duration || 1000,
      isClosable: settings?.hasCloseButton || true,
      variant: settings?.variants || 'left-accent',
      position: settings?.positions || 'top',
    }),
};

export default toaster;
