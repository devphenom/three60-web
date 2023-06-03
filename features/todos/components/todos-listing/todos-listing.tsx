import { Wrap } from '@chakra-ui/react';

import TodoCard from '../todo-card/todo-card';
import { useAppSelector } from '@redux/hooks';
import { useGetTodosQuery } from '@todos/redux/todo-api';
import { LoadingStateSpinner } from '@global';
import EmptyTodo from '@todos/components/empty-todo/empty-todo';
import { ITodo } from '@todos/services/todo-types';

const TodosListing = () => {
  const { currentStatus } = useAppSelector((state) => state.todo);
  const { data, isLoading, isError } = useGetTodosQuery(currentStatus.id ?? 0);

  if (isLoading) {
    return <LoadingStateSpinner />;
  }

  if (!data?.todos?.length) {
    return <EmptyTodo />;
  }

  return (
    <Wrap>
      {data?.todos?.map((todo: ITodo) => (
        <TodoCard item={todo} key={todo._id} />
      ))}
    </Wrap>
  );
};

export default TodosListing;
