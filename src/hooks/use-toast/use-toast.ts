import { useToast } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

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

const useToaster = () => {
  const toast = useToast();

  const danger = (title?: string, settings?: ToastSettings) =>
    toast({
      title,
      status: 'error',
      description: settings?.description || null,
      duration: settings?.duration || 5000,
      isClosable: settings?.hasCloseButton || true,
      variant: settings?.variants || 'left-accent',
      position: settings?.positions || 'top',
    });

  const success = (title?: string, settings?: ToastSettings) =>
    toast({
      title,
      status: 'success',
      description: settings?.description || null,
      duration: settings?.duration || 5000,
      isClosable: settings?.hasCloseButton || true,
      variant: settings?.variants || 'left-accent',
      position: settings?.positions || 'top',
    });

  const warning = (title?: string, settings?: ToastSettings) =>
    toast({
      title,
      status: 'warning',
      description: settings?.description || null,
      duration: settings?.duration || 5000,
      isClosable: settings?.hasCloseButton || true,
      variant: settings?.variants || 'left-accent',
      position: settings?.positions || 'top',
    });

  const info = (title?: string, settings?: ToastSettings) =>
    toast({
      title,
      status: 'info',
      description: settings?.description || null,
      duration: settings?.duration || 5000,
      isClosable: settings?.hasCloseButton || true,
      variant: settings?.variants || 'left-accent',
      position: settings?.positions || 'top',
    });

  return { danger, success, warning, info };
};

export default useToaster;
