import { Wrap } from '@chakra-ui/react';

import TodoCard from '../todo-card/todo-card';
import { useAppSelector } from '@redux/hooks';
import { useGetTodosQuery } from '@todos/redux/todo-api';
import { LoadingStateSpinner } from '@global';
import EmptyTodo from '@todos/components/empty-todo/empty-todo';
import { ITodo } from '@todos/services/todo-types';
import TodoCardSkeleton from '../todo-card-skeleton/todo-card-skeleton';

const TodosListing = () => {
  const { currentStatus } = useAppSelector((state) => state.todo);
  const { data, isLoading, isError } = useGetTodosQuery(currentStatus.id ?? 0);

  if (isLoading) {
    return (
      <>
        {Array(8)
          .fill(1)
          .map((item, i) => (
            <TodoCardSkeleton key={i} />
          ))}
      </>
    );
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
