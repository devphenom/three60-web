import React, { useEffect, useState } from 'react';
import { MobileHeader, DesktopHeader } from '@components';
import { Box, Show } from '@chakra-ui/react';
import { useDebounce } from '@hooks';
import { setSearchTerm } from '@todos/redux/todo-slice';
import { useAppDispatch } from '@redux/hooks';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 1000)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(setSearchTerm(debouncedValue))
  },[debouncedValue, dispatch])
  

  return (
    <Box>
      <Show below="md">
        <MobileHeader searchTerm={value} handleChange={handleChange} />
      </Show>

      <Show above="md">
        <DesktopHeader searchTerm={value} handleChange={handleChange} />
      </Show>
    </Box>
  );

  // <MobileHeader />;
};
