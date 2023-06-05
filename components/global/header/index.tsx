import React, { useState } from 'react';
import { MobileHeader, DesktopHeader } from '@components';
import { Box, Show } from '@chakra-ui/react';

export const Header: React.FC = () => {
  const [value, setValue] = useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <Box>
      <Show below="md">
        <MobileHeader value={value} handleChange={handleChange} />
      </Show>

      <Show above="md">
        <DesktopHeader value={value} handleChange={handleChange} />
      </Show>
    </Box>
  );

  // <MobileHeader />;
};
