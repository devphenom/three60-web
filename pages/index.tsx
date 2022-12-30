import React from 'react';
import Auth from '@components/home/auth/auth';
import Landing from '@components/home/landing/landing';
import { Container, Flex } from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <Container maxW="container.3xl" p="0">
      <Flex flexDirection={['column-reverse', 'row', 'row']} minH="100vh">
        <Landing />
        <Auth />
      </Flex>
    </Container>
  );
};

export default Home;
