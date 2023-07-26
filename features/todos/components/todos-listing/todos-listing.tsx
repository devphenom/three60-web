import { Wrap } from '@chakra-ui/react';

import TodoCard from '../todo-card/todo-card';
import { useAppSelector } from '@redux/hooks';
import { useGetTodosQuery } from '@todos/redux/todo-api';
import EmptyTodo from '@todos/components/empty-todo/empty-todo';
import { ITodo } from '@todos/services/todo-types';
import TodoCardSkeleton from '../todo-card-skeleton/todo-card-skeleton';
import { useEffect, useState } from 'react';

const TodosListing = () => {
  const { currentStatus, searchTerm } = useAppSelector((state) => state.todo);

  const [isReloading, setIsReloading] = useState(false);
  const [trackingStatusId, setTrackingStatusId] = useState<null | number>(null);

  const { data, isFetching } = useGetTodosQuery({
    statusId: currentStatus.id ?? 0,
    searchTerm,
  });

  useEffect(() => {
    if (isFetching) {
      if (trackingStatusId !== currentStatus.id) {
        setIsReloading(true);
        setTrackingStatusId(currentStatus.id ?? 0);
      } else {
        setIsReloading(false);
      }
    } else {
      setIsReloading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  if (isReloading) {
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
