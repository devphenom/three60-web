import { Box, Circle, Flex, Stack, StackItem } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { TODO_OPTIONS } from '..';

type Props = {
  currentState: { id: number; name: string; value: number };
  updateCurrentState: (val: {
    id: number;
    name: string;
    value: number;
  }) => void;
};

const StyledFlex = styled(Flex)`
  &.active {
    .circle {
      background: rgba(70, 115, 228, 0.18);
    }
    color: var(--brand-500);
    border-bottom: 1px solid var(--brand-500);
  }
`;

const TodoNavbar = ({ currentState, updateCurrentState }: Props) => {
  return (
    <Box
      bg="white"
      borderRadius={'100px'}
      boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1);"
    >
      <Stack
        mx={6}
        direction={'row'}
        align="flex-end"
        height="66px"
        overflow={'scroll'}
      >
        {TODO_OPTIONS.map((option) => (
          <StackItem
            key={option.id}
            h="full"
            onClick={() => updateCurrentState(option)}
          >
            <StyledFlex
              h="full"
              as="button"
              align={'center'}
              gap={3}
              className={option.id === currentState.id ? 'active' : ''}
            >
              <Circle className="circle" size={7} bg="blackAlpha.100">
                {option.value}
              </Circle>
              {option.name}
            </StyledFlex>
          </StackItem>
        ))}
      </Stack>
    </Box>
  );
};

export default TodoNavbar;
