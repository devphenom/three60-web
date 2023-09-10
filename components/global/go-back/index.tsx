import { IconButton } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import React from 'react';

export const GoBack = () => {
  const router = useRouter();

  return (
    <Box mb={6}>
      <IconButton
        p={0}
        onClick={() => router.back()}
        aria-label="go back"
        icon={<ArrowLeft weight="thin" fontSize={32} />}
        size="md"
        variant="ghost"
      />
    </Box>
  );
};
