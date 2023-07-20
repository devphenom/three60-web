import { Wrap } from '@chakra-ui/react';

import TodoCard from '../todo-card/todo-card';
import { useAppSelector } from '@redux/hooks';
import { useGetTodosQuery } from '@todos/redux/todo-api';
import EmptyTodo from '@todos/components/empty-todo/empty-todo';
import { ITodo } from '@todos/services/todo-types';
import TodoCardSkeleton from '../todo-card-skeleton/todo-card-skeleton';

const TodosListing = () => {
  const { currentStatus, searchTerm } = useAppSelector((state) => state.todo);

  const { data, isLoading /*isFetching*/ } = useGetTodosQuery({
    statusId: currentStatus.id ?? 0,
    searchTerm,
  });

  if (isLoading) {
    return (
      <>
        <Wrap>
          {Array(8)
            .fill(1)
            .map((item, i) => (
              <TodoCardSkeleton key={i} />
            ))}
        </Wrap>
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
