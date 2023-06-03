import React from 'react';
import { Flex, Text, Stack, Box } from '@chakra-ui/react';

import { TodoIcon } from '@icons/TodoIcon';

type Props = {};

const EmptyTodo = (props: Props) => {
  return (
    <Stack
      w="full"
      h="full"
      align={'center'}
      justify="center"
      data-testid="empty-todo"
    >
      <TodoIcon width="100px" height="100%" color="rgba(0, 0, 0, 0.09)" />

      <Text color={'gray'}>No todos at the moment</Text>
    </Stack>
  );
};

export default EmptyTodo;
