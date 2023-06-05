import React, { useEffect, useState } from 'react';
import { Box, Text, Container } from '@chakra-ui/react';

import { isLoading } from '@utils/functions';
import { Header } from '@global';
import { useAppSelector } from '@redux/hooks';

import TodoNavbar from '../todo-navbar/todo-navbar';
import CreateTodo from '../create-todo/create-todo';
import TodosListing from '../todos-listing/todos-listing';

type Props = {};

const TodosWrapper = (props: Props) => {
  const { currentStatus } = useAppSelector((state) => state.todo);
  return (
    <Box overflow={'hidden'} bg="var(--brand-bg)">
      <Header />
      <CreateTodo />
      <TodoNavbar />
      <Container p={6} minH="100vh">
        <Text>{currentStatus.description}</Text>
        <TodosListing />
      </Container>
    </Box>
  );
};

export default TodosWrapper;
