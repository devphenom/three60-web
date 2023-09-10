import { Box, Container } from '@chakra-ui/layout';
import React from 'react';
import { GoBack, Header } from '@global';
import SingleTodo from '../single-todo/single-todo';

type Props = {};

const SingleTodoWrapper = (props: Props) => {
  return (
    <Box overflow="hidden" bg="#fff">
      <Header />

      <Container p={6} position="relative">
        <GoBack />
        <SingleTodo />
      </Container>
    </Box>
  );
};

export default SingleTodoWrapper;
