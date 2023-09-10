import {
  Container,
  SkeletonText,
  HStack,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

type Props = {};

const TodoCardSkeleton = (props: Props) => {
  return (
    <Container
      boxShadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
      p={3}
      bg="white"
      borderRadius={5}
    >
      <SkeletonText mb={2} noOfLines={1} skeletonHeight="7" />
      <SkeletonText mb={2} noOfLines={1} skeletonHeight="3" />

      <HStack w="full" mt={5} justifyContent="space-between">
        <SkeletonText w="30%" noOfLines={1} skeletonHeight="5" />
        <SkeletonText w="40px" noOfLines={1} skeletonHeight="3" />
      </HStack>
    </Container>
  );
};

export default TodoCardSkeleton;
