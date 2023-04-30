import React, { useEffect, useState } from 'react';
import { Box, Text, Container } from '@chakra-ui/react';

import { Header, LoadingStateSpinner } from '@global';
import { isLoading } from '@utils/functions';

import CreateTodo from './create-todo/create-todo';
import TodoNavbar from './todo-navbar/todo-navbar';
import TodosListing from './todos-listing/todos-listing';
import { getAllTodosAction } from '@redux/features/todo/todo-actions';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import EmptyTodo from './empty-todo/empty-todo';
import { ITodoCount } from '@components/todos/todo-services/types';

type Props = {};

const defaultNav = { id: 0, title: 'All todos', value: 0 };

const Todos = (props: Props) => {
  const dispatch = useAppDispatch();

  const [navCurrentState, setNavCurrentState] =
    useState<ITodoCount>(defaultNav);

  const updateNavCurrentState = (val: ITodoCount) => setNavCurrentState(val);

  const { allTodos, getAllTodoStatus } = useAppSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getAllTodosAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTodoBasedOnStatus = () => {
    if (isLoading(getAllTodoStatus)) {
      return <LoadingStateSpinner />;
    }

    if (!allTodos.length) {
      return <EmptyTodo />;
    }

    return (
      <>
        <Text>{navCurrentState.title}</Text>
        <TodosListing data={allTodos} />
      </>
    );
  };

  return (
    <Box overflow={'hidden'} bg="var(--brand-bg)">
      <Header />
      <CreateTodo />
      <TodoNavbar
        currentState={navCurrentState}
        updateCurrentState={updateNavCurrentState}
      />

      <Container p={6} minH="100vh">
        {renderTodoBasedOnStatus()}
      </Container>
    </Box>
  );
};

export { Todos as TodosComponent };
