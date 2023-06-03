import React, { useEffect, useState } from 'react';
import { Box, Text, Container } from '@chakra-ui/react';

import { isLoading } from '@utils/functions';
import { Button, Header, LoadingStateSpinner } from '@global';
import { useAppDispatch, useAppSelector } from '@redux/hooks';

import EmptyTodo from '../empty-todo/empty-todo';
import TodoNavbar from '../todo-navbar/todo-navbar';
import CreateTodo from '../create-todo/create-todo';
import TodosListing from '../todos-listing/todos-listing';
import { logout } from '@auth/redux/auth-slice';

type Props = {};

const TodosWrapper = (props: Props) => {
  const { currentStatus } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  return (
    <Box overflow={'hidden'} bg="var(--brand-bg)">
      <Header />
      <CreateTodo />
      <TodoNavbar />
      <Container p={6} minH="100vh">
        <Text>{currentStatus.description}</Text>
        <TodosListing />
      </Container>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </Box>
  );
};

export default TodosWrapper;
