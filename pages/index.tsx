import React from 'react';
import Auth from '@components/auth/auth';
import Landing from '@components/home/landing';
import { Container, Flex } from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <Container maxW="container.3xl" p="0">
      <Flex minH="100vh">
        <Landing />
        <Auth />
      </Flex>
    </Container>
  );
};

export default Home;
