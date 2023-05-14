/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { HomeIconsProps } from 'types';
import {
  Box,
  Center,
  Circle,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@components/global';

const HomeIcons = ({ imageSrc, text }: HomeIconsProps) => (
  <Center
    w={['100%', '200px', '200px']}
    h="105px"
    bg="white"
    borderRadius="5px"
  >
    <HStack alignItems="center" justifyContent="center" h="full">
      <Circle
        data-testid="landing-lists"
        as="span"
        borderRadius="50%"
        bg="blackAlpha.200"
        size="8"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={imageSrc} alt="todos" width="20%" height="20%" />
      </Circle>
      <Text textTransform="uppercase">{text}</Text>
    </HStack>
  </Center>
);

export const HomeIconsContainer = () => (
  <VStack
    color="blackAlpha.600"
    gap={5}
    flexWrap={'wrap'}
    flexDir={['column', 'row', 'row']}
  >
    <HomeIcons imageSrc="/icons/todos.svg" text="todos" />
    <HomeIcons imageSrc="/icons/notes.svg" text="notes" />
    <HomeIcons imageSrc="/icons/bookmarks.svg" text="bookmarks" />
    {/* //todo: change extension icon */}
    <HomeIcons imageSrc="/icons/bookmarks.svg" text="Extension" />
  </VStack>
);

const Landing: React.FC = () => (
  <Box bg="brand.100" color="white" minH="100vh">
    <Container maxW={1200} h="full" py={10}>
      <Flex minH="85vh" align="center" direction={['column', 'row']}>
        <Box p={5} w={['100%', '50%', '50%']}>
          <Heading as="h1" fontSize={'48px'} fontWeight={400}>
            Track how far <br /> you've gone
          </Heading>

          <Text maxW="500px" data-testid="description">
            Sit nisi incididunt tempor do duis fugiat proident excepteur. Ex
            elit pariatur incididunt nostrud occaecat mollit id occaecat.
            Voluptate adipisicing commodo.
          </Text>
          <Link href="/todos">
            <Button colorScheme="green" mr={2} px={10} onClick={() => null}>
              Track
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="outline" onClick={() => null}>
              Sign in
            </Button>
          </Link>
        </Box>
        <Spacer />
        <Box p={5} w={['100%', '50%', '50%']}>
          <HomeIconsContainer />
        </Box>
      </Flex>
    </Container>
  </Box>
);

export default Landing;
