import React from 'react';
import { TodosComponent } from '@components/todos';
import withAuth from '@components/protected-route/withAuth';
import { Box } from '@chakra-ui/react';
import { Button } from '../components/global';
import { signOut } from 'next-auth/react';

type Props = {};

const Todos = (props: Props) => {
  // return <TodosComponent />;
  return (
    <Box>
      Hello
      <Button onClick={() => signOut()}>Logout</Button>
    </Box>
  );
};

export default withAuth(Todos);
