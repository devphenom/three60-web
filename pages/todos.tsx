import React from 'react';
import { TodosComponent } from '@components/todos';
import withAuth from '../components/protected-route/withAuth';

type Props = {};

const Todos = (props: Props) => {
  return <TodosComponent />;
};

export default withAuth(Todos);
