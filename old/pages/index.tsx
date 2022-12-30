import React from 'react';
import Landing from '@components/home/landing/landing';
import { Container, Flex } from '@chakra-ui/react';
import Auth from '@components/home/auth/auth';

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
