/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Show,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { HomeIconsContainer } from '../../landing/landing';

type Props = {
  children: ReactElement;
};

const AuthWrapper = (props: Props) => {
  return (
    <Box>
      <Flex minH="100vh" flexWrap="wrap">
        <Show above="sm">
          <Box w={['100%', '50%', '50%']} bg="brand.100" p={20} color="white">
            <VStack height="100%" align="flex-start" justify="center">
              <Heading as="h1" fontSize={'48px'} fontWeight={500}>
                Track how far <br /> you've gone
              </Heading>
              <Text maxW="500px" data-testid="description">
                Sit nisi incididunt tempor do duis fugiat proident excepteur. Ex
                elit pariatur incididunt nostrud occaecat mollit id occaecat.
                Voluptate adipisicing commodo.
              </Text>
              <HomeIconsContainer />
            </VStack>
          </Box>
        </Show>

        <Box w={['100%', '50%', '50%']} px={[6, 10, 20]} pt={[6, 10, 10]}>
          <Stack w="full" alignItems="flex-start">
            <HStack mb={4}>
              <Image alt="logo" src="/icons/logo.svg" />
              <Heading
                as="h2"
                fontSize="24px"
                color="brand.100"
                fontWeight="500"
              >
                three60
              </Heading>
            </HStack>

            {props.children}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthWrapper;
