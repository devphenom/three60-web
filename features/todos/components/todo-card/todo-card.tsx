import {
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import { Button } from '@global';
import { DeleteIcon, EditIcon, EllipsesIcon, MarkCompleteIcon } from '@icons';
import { ITodo } from '@todos/services/todo-types';
import { formatEventTime, formatFullDate } from '@utils/functions';

type Props = { item: ITodo };

const menuItemProps = {
  p: 6,
  as: Button,
  variant: 'ghost',
  justifyContent: 'flex-start',
  iconSpacing: 4,
};

const TodoCard = ({ item }: Props) => {
  return (
    <Container
      boxShadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
      p={3}
      bg="white"
      borderRadius={5}
    >
      <Heading as="h6" fontSize="md" fontWeight="400" data-testid="heading">
        {item?.title}
      </Heading>
      <Text
        my={2}
        fontSize={'10px'}
        color="blackAlpha.500"
        data-testid="date-created"
      >
        Created on {formatFullDate(item?.createdAt)} at{' '}
        {formatEventTime(item?.createdAt)}
      </Text>
      <Flex justify={'space-between'}>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="secondary"
            variant="ghost"
            borderRadius={'100px'}
            minW="97px"
          >
            {item?.status?.description}
          </MenuButton>
          <MenuList>
            <MenuItem>In Progress</MenuItem>
            <MenuItem>Overdue</MenuItem>
            <MenuItem>Complete</MenuItem>
            <MenuItem>Trash</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton>
            <EllipsesIcon />
          </MenuButton>
          <MenuList>
            <MenuItem
              {...menuItemProps}
              onClick={() => console.log('marked')}
              leftIcon={<MarkCompleteIcon />}
            >
              Mark as Complete
            </MenuItem>
            <MenuItem leftIcon={<EditIcon />} {...menuItemProps}>
              Edit
            </MenuItem>
            <MenuItem {...menuItemProps} leftIcon={<DeleteIcon />}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Container>
  );
};

export default TodoCard;
