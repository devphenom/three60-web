import { Wrap } from '@chakra-ui/react';

import TodoCard from '../todo-card/todo-card';
import { ITodo } from '../../../features/todos/todo-services/todo-utils';

type Props = {
  data: ITodo[];
};

const TodosListing = ({ data }: Props) => {
  return (
    <Wrap>
      {data.map((todo) => (
        <TodoCard item={todo} key={todo.id} />
      ))}
    </Wrap>
  );
};

export default TodosListing;
