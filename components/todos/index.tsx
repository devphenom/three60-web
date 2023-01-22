import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

import { Header } from '@global';

import CreateTodo from './create-todo/create-todo';
import TodoNavbar from './todo-navbar/todo-navbar';
import TodosListing from './todos-listing/todos-listing';

type Props = {};

export const TODO_OPTIONS = [
  {
    id: 1,
    name: 'All todos',
    value: 3,
  },
  {
    id: 2,
    name: 'Backlog',
    value: 3,
  },
  {
    id: 3,
    name: 'In Progress',
    value: 3,
  },
  {
    id: 4,
    name: 'Finished',
    value: 3,
  },
  {
    id: 5,
    name: 'Overdue',
    value: 3,
  },
  {
    id: 6,
    name: 'Trash',
    value: 3,
  },
];

const Todos = (props: Props) => {
  const [navCurrentState, setNavCurrentState] = useState(TODO_OPTIONS[0]);
  const updateNavCurrentState = (val: {
    id: number;
    name: string;
    value: number;
  }) => setNavCurrentState(val);
  return (
    <Box overflow={'hidden'} bg="var(--brand-bg)">
      <Header />
      <CreateTodo />
      <TodoNavbar
        currentState={navCurrentState}
        updateCurrentState={updateNavCurrentState}
      />

      <Box p={6}>
        <Text>{navCurrentState.name}</Text>

        <TodosListing />
      </Box>
    </Box>
  );
};

export { Todos as TodosComponent };
