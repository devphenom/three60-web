import React from 'react';
import IsAuth from '@components/protected-route/withAuth';
import TodosWrapper from '@todos/components/todos-wrapper/todos-wrapper';

type Props = {};

const Todos = (props: Props) => {
  return <TodosWrapper />;
};

export default IsAuth(Todos);
