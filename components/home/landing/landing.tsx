import React from 'react';
import { HomeIconsProps } from 'types';
import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

const HomeIcons = ({ imageSrc, text }: HomeIconsProps) => (
  <Box w={['full', '144px', '144px']} h="105px" bg="white" borderRadius="5px">
    <HStack alignItems="center" justifyContent="center" h="full">
      <Text
        data-testid="landing-lists"
        as="span"
        borderRadius="50%"
        bg="blackAlpha.200"
        w="8"
        h="8"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={imageSrc} alt="todos" width="20%" height="20%" />
      </Text>
      <Text textTransform="uppercase">{text}</Text>
    </HStack>
  </Box>
);

const Landing: React.FC = () => (
  <Box w={['full', '50%', '50%']} h="full auto">
    <VStack
      flex="1"
      bg="brand.100"
      color="white"
      justify="flex-start"
      align="flex-start"
      spacing={12}
      px={[10, 20, 20]}
      py={50}
      position={['inherit', 'fixed', 'fixed']}
      top={0}
      bottom={0}
    >
      <Heading as="h1" fontSize={'48px'} fontWeight={400}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Track how far <br /> you've gone
      </Heading>

      <Flex
        color="blackAlpha.600"
        gap={5}
        flexDir={['column', 'row', 'row']}
        width="full"
      >
        <HomeIcons imageSrc="/icons/todos.svg" text="todos" />
        <HomeIcons imageSrc="/icons/notes.svg" text="notes" />
        <HomeIcons imageSrc="/icons/bookmarks.svg" text="bookmarks" />
      </Flex>
      <Text maxW="500px" data-testid="description">
        Sit nisi incididunt tempor do duis fugiat proident excepteur. Ex elit
        pariatur incididunt nostrud occaecat mollit id occaecat. Voluptate
        adipisicing commodo.{' '}
      </Text>
    </VStack>
  </Box>
);

export default Landing;
