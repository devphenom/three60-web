import { Wrap } from '@chakra-ui/react';
import React from 'react';
import TodoCard from '../todo-card/todo-card';

type Props = {};

const TodosListing = (props: Props) => {
  return (
    <Wrap>
      <TodoCard />
      <TodoCard />
    </Wrap>
  );
};

export default TodosListing;
