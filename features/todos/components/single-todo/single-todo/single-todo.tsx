import { IconButton } from '@chakra-ui/button';
import { Box, Circle, Flex, HStack, Text } from '@chakra-ui/layout';
import { Clock, PencilSimpleLine, Trash } from '@phosphor-icons/react';
import React from 'react';

type Props = {};

const SingleTodo = (props: Props) => {
  return (
    <>
      <Flex justifyContent={'space-between'} mb={4}>
        <HStack>
          <Circle size={9} bg="brand.PRYLIGHT">
            <Circle color="white" bg="brand.100" size={8}>
              3
            </Circle>
          </Circle>
          <Text color="brand.PRY" fontSize="xl">
            In Progress
          </Text>
        </HStack>
        <HStack color="blackAlpha.500">
          <Clock weight="light" size={24} />
          <Text fontSize="md">24/07/2019</Text>
        </HStack>
      </Flex>

      <Text fontSize="4xl" lineHeight="normal">
        Create and endpoint to get the list of users
      </Text>

      <Text color="blackAlpha.700" fontWeight="400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </Text>
      <Text color="blackAlpha.700" fontWeight="400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </Text>

      <Box position="fixed" bottom={0} left={0} right={0} p={5}>
        <Flex justify="flex-end" gap={5}>
          <IconButton
            isRound
            bg="green.100"
            color="green.500"
            aria-label="edit todo"
            icon={<PencilSimpleLine weight="thin" size={32} />}
            size="lg"
            onClick={() => null}
          />
          <IconButton
            isRound
            bg="red.100"
            color="red.500"
            aria-label="edit todo"
            icon={<Trash weight="thin" size={32} />}
            size="lg"
            onClick={() => null}
          />
        </Flex>
      </Box>
    </>
  );
};

export default SingleTodo;
