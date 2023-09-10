import {
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import { Button } from '@global';
import { DeleteIcon, EditIcon, EllipsesIcon, MarkCompleteIcon } from '@icons';

import {
  useGetTodoStatusQuery,
  useUpdateTodoMutation,
} from '@todos/redux/todo-api';
import EditTodo from '../edit-todo/edit-todo';
import { ITodoStatus, TTodoCardProps } from '@todos/services/todo-types';
import { statusBtnColorScheme, statusTitle } from '@todos/services/todo-utils';
import { formatEventTime, formatFullDate } from '@utils/functions';
import { useRouter } from 'next/router';

const menuItemProps = {
  p: 6,
  as: Button,
  variant: 'ghost',
  justifyContent: 'flex-start',
  iconSpacing: 4,
};

const TodoCard = ({ item }: TTodoCardProps) => {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const { data } = useGetTodoStatusQuery();
  const router = useRouter();

  return (
    <Container
      boxShadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
      p={3}
      bg="white"
      borderRadius={5}
    >
      <Heading
        as="h6"
        fontSize="md"
        fontWeight="400"
        data-testid="heading"
        onClick={() => router.push(`/todos/${item._id}`)}
        cursor="pointer"
      >
        {item?.title}
      </Heading>
      <Text
        my={2}
        fontSize={'10px'}
        color="blackAlpha.500"
        data-testid="date-created"
      >
        Expires on {formatFullDate(item?.expiryDate || item?.createdAt)} at{' '}
        {formatEventTime(item?.expiryDate || item?.createdAt)}
      </Text>
      <Flex justify={'space-between'}>
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            borderRadius={'100px'}
            minW="97px"
            isDisabled={isLoading}
            colorScheme={statusBtnColorScheme[item.statusId]}
          >
            {statusTitle[item?.statusId]}
          </MenuButton>
          <MenuList>
            {data?.status
              ?.filter(({ id }) => id !== item.statusId)
              .map((status: ITodoStatus) => {
                return (
                  <MenuItem
                    onClick={() => updateTodo({ ...item, statusId: status.id })}
                    key={status.id}
                  >
                    {status.description}
                  </MenuItem>
                );
              })}
          </MenuList>
        </Menu>

        {item.statusId !== 5 && (
          <Menu>
            <MenuButton>
              <EllipsesIcon />
            </MenuButton>
            <MenuList>
              {item.statusId !== 3 && (
                <MenuItem
                  {...menuItemProps}
                  onClick={() => updateTodo({ ...item, statusId: 3 })}
                  leftIcon={<MarkCompleteIcon />}
                >
                  Mark as Complete
                </MenuItem>
              )}
              {item.statusId !== 3 && (
                <EditTodo item={item}>
                  {(onOpen: () => void) => (
                    <>
                      <MenuItem
                        onClick={onOpen}
                        leftIcon={<EditIcon />}
                        {...menuItemProps}
                      >
                        Edit
                      </MenuItem>
                    </>
                  )}
                </EditTodo>
              )}

              <MenuItem
                {...menuItemProps}
                leftIcon={<DeleteIcon />}
                onClick={() => updateTodo({ ...item, statusId: 5 })}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Container>
  );
};

export default TodoCard;
