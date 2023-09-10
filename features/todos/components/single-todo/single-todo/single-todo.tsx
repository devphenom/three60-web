import React from 'react';
import { useRouter } from 'next/router';
import { IconButton } from '@chakra-ui/button';
import { Box, Circle, Flex, HStack, Text } from '@chakra-ui/layout';
import { Clock, PencilSimpleLine, Trash } from '@phosphor-icons/react';

import EditTodo from '../../edit-todo/edit-todo';
import { formatDatetime } from '@utils/functions';
import { useGetTodoQuery, useUpdateTodoMutation } from '@todos/redux/todo-api';
import SingleTodoSkeleton from '../single-todo-skeleton/single-todo-skeleton';
import { statusBtnColorScheme, statusTitle } from '@todos/services/todo-utils';

type Props = {};

const SingleTodo = (props: Props) => {
  const { query } = useRouter();
  const { data, error, isError, isFetching } = useGetTodoQuery(
    String(query.id),
  );

  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  if (isError)
    return (
      <>
        {console.log(error)}
        Error: check console for details
      </>
    );

  if (data)
    return (
      <>
        <Flex justifyContent={'space-between'} mb={4}>
          <HStack>
            <Circle size={9} bg={`${statusBtnColorScheme[data.statusId]}.100`}>
              <Circle
                color="white"
                bg={`${statusBtnColorScheme[data.statusId]}.500`}
                size={8}
              >
                {data.statusId}
              </Circle>
            </Circle>
            <Text
              color={`${statusBtnColorScheme[data.statusId]}.500`}
              fontSize="xl"
            >
              {statusTitle[data.statusId]}
            </Text>
          </HStack>
          <HStack color="blackAlpha.500">
            <Clock weight="light" size={24} />
            <Text fontSize="md">{formatDatetime(data?.expiryDate)}</Text>
          </HStack>
        </Flex>

        <Text fontSize="4xl" lineHeight="normal">
          {data.title}
        </Text>

        <Text color="blackAlpha.700" fontWeight="400">
          {data.description}
        </Text>

        <Box position="fixed" bottom={0} left={0} right={0} p={5}>
          <Flex justify="flex-end" gap={5}>
            {![3, 5].includes(data.statusId) && (
              <EditTodo item={data}>
                {(onOpen: () => void) => (
                  <>
                    <IconButton
                      isRound
                      bg="green.100"
                      color="green.500"
                      aria-label="edit todo"
                      icon={<PencilSimpleLine weight="thin" size={32} />}
                      size="lg"
                      onClick={onOpen}
                    />
                  </>
                )}
              </EditTodo>
            )}

            {data.statusId !== 5 && (
              <IconButton
                isRound
                isLoading={isLoading}
                bg="red.100"
                color="red.500"
                aria-label="edit todo"
                icon={<Trash weight="thin" size={32} />}
                size="lg"
                onClick={() => updateTodo({ ...data, statusId: 5 })}
              />
            )}
          </Flex>
        </Box>
      </>
    );

  return <SingleTodoSkeleton />;
};

export default SingleTodo;
