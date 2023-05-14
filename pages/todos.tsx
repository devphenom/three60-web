import React from 'react';
import { TodosComponent } from '@components/todos';
import withAuth from '../components/protected-route/withAuth';
import { Box } from '@chakra-ui/react';

type Props = {};

const Todos = (props: Props) => {
  // return <TodosComponent />;
  return <Box>Hello</Box>;
};

export default withAuth(Todos);
