import React from 'react';
import { HomeIconsProps } from 'src/types';
import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';

const HomeIcons = ({ imageSrc, text }: HomeIconsProps) => (
  <Box w="144px" h="105px" bg="white" borderRadius="5px">
    <HStack alignItems="center" justifyContent="center" h="full">
      <Text
        as="span"
        borderRadius="50%"
        bg="blackAlpha.200"
        w="8"
        h="8"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img src={imageSrc} alt="todos" />
      </Text>
      <Text textTransform="uppercase">{text}</Text>
    </HStack>
  </Box>
);

const Landing: React.FC = () => (
  <VStack
    flex="1"
    bg="brand.100"
    color="white"
    w="full"
    h="full auto"
    justify="center"
    align="flex-start"
    spacing={12}
    px={20}
  >
    <Heading as="h1" fontSize="48px" fontWeight={400}>
      Track how far <br /> you've gone
    </Heading>

    <Flex color="blackAlpha.600" gap={5}>
      <HomeIcons imageSrc="/icons/todos.svg" text="todos" />
      <HomeIcons imageSrc="/icons/notes.svg" text="notes" />
      <HomeIcons imageSrc="/icons/bookmarks.svg" text="bookmarks" />
    </Flex>
    <Text maxW="500px">
      Sit nisi incididunt tempor do duis fugiat proident excepteur. Ex elit
      pariatur incididunt nostrud occaecat mollit id occaecat. Voluptate
      adipisicing commodo.{' '}
    </Text>
  </VStack>
);

export default Landing;
