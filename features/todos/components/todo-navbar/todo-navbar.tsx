import styled from '@emotion/styled';
import {
  Box,
  Circle,
  Flex,
  Skeleton,
  Stack,
  StackItem,
} from '@chakra-ui/react';

import { toSentence } from '@utils/functions';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { ITodoStatus } from '@todos/services/todo-types';
import { useGetTodoCountsQuery } from '@todos/redux/todo-api';
import { setCurrentStatus } from '@todos/redux/todo-slice';

type Props = {
  currentState?: ITodoStatus;
  updateCurrentState?: (val: ITodoStatus) => void;
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

const NavbarContainer = styled(Stack)`
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /*
 
`;

const TodoNavbar = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useGetTodoCountsQuery();

  const { todoCounts, currentStatus } = useAppSelector((state) => state.todo);

  return (
    <Box
      bg="white"
      borderRadius={'100px'}
      boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1);"
    >
      <Skeleton isLoaded={!isLoading} height="66px">
        <NavbarContainer
          mx={6}
          direction={'row'}
          align="flex-end"
          height="66px"
          overflow={'scroll'}
          gap={3}
        >
          {todoCounts?.map((option) => (
            <StackItem
              h="full"
              onClick={() => dispatch(setCurrentStatus(option))}
              key={option.id}
            >
              <StyledFlex
                h="full"
                as="button"
                align={'center'}
                gap={3}
                className={option.id === currentStatus?.id ? 'active' : ''}
              >
                <Circle className="circle" size={7} bg="blackAlpha.100">
                  {option.count}
                </Circle>
                {toSentence(option.description)}
              </StyledFlex>
            </StackItem>
          ))}
        </NavbarContainer>
      </Skeleton>
    </Box>
  );
};

export default TodoNavbar;
