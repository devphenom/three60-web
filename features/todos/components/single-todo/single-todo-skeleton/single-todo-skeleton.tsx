import {
  Container,
  SkeletonText,
  HStack,
  Skeleton,
  VStack,
  SkeletonCircle,
  Stack,
  Flex,
  Box,
} from '@chakra-ui/react';
import React from 'react';

type Props = {};

const SingleTodoSkeleton = (props: Props) => {
  return (
    <Container>
      <Flex justify="space-between" mb={8}>
        <HStack>
          <SkeletonCircle size="9" />
          <Box w="50px">
            <SkeletonText noOfLines={1} skeletonHeight="3" />
          </Box>
        </HStack>

        <HStack>
          <SkeletonCircle size="9" />
          <Box w="50px">
            <SkeletonText noOfLines={1} skeletonHeight="3" />
          </Box>
        </HStack>
      </Flex>

      <SkeletonText mb={8} noOfLines={1} skeletonHeight="7" />
      <SkeletonText mb={2} noOfLines={10} skeletonHeight="3" />
      <Box position="fixed" bottom={0} left={0} right={0} p={5}>
        <Flex justify="flex-end" gap={5}>
          <SkeletonCircle size="9" />
          <SkeletonCircle size="9" />
        </Flex>
      </Box>
    </Container>
  );
};

export default SingleTodoSkeleton;
