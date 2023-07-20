import styled from '@emotion/styled';
import { Box, Circle, Skeleton, Stack, StackItem } from '@chakra-ui/react';

import { toSentence } from '@utils/functions';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { ITodoStatus } from '@todos/services/todo-types';
import { useGetTodoCountsQuery } from '@todos/redux/todo-api';
import { setCurrentStatus } from '@todos/redux/todo-slice';
import { Button } from '@global';
import { statusBtnColorScheme } from '@todos/services/todo-utils';

const StyledButton = styled(Button)`
  border-radius: 0;
  padding-inline: 8px;
  display: flex;
  align-items: center;
  &.active {
    border-bottom: 2px solid var(--brand-500);
  }
  &:hover {
    background-color: transparent;
  }
`;

const NavbarContainer = styled(Stack)`
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /*
 
`;

const TodoNavbar = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useGetTodoCountsQuery();

  const { currentStatus } = useAppSelector((state) => state.todo);

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
          {data?.result?.map((option) => (
            <StackItem
              h="full"
              onClick={() => dispatch(setCurrentStatus(option))}
              key={option.id}
            >
              <StyledButton
                height="full"
                variant="ghost"
                colorScheme={statusBtnColorScheme[option.id]}
                gap={3}
                className={option.id === currentStatus?.id ? 'active' : ''}
              >
                <Circle className="circle" size={7} bg="blackAlpha.100">
                  {option.count}
                </Circle>
                {toSentence(option.description)}
              </StyledButton>
            </StackItem>
          ))}
        </NavbarContainer>
      </Skeleton>
    </Box>
  );
};

export default TodoNavbar;
