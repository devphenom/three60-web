import { FormikValues } from 'formik';
import {
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

import { AddIcon } from '@icons';
import { Button } from '@global';
import { isLoading } from '@utils/functions';
import { useAppDispatch, useAppSelector } from '@redux/hooks';

import TodoForm from '../todo-form/todo-form';
import { postTodoAction } from '@redux/features/todos';

type Props = {};

const CreateTodo = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const { postTodoStatus } = useAppSelector((state) => state.todo);

  const onSubmit = async (values: FormikValues) => {
    await dispatch(postTodoAction(values));
    onClose();
  };

  return (
    <>
      <Container py={4} px={6}>
        <Button
          data-testid="create-todo"
          colorScheme={'secondary'}
          w="100%"
          leftIcon={<AddIcon />}
          iconSpacing={4}
          onClick={onOpen}
          fontWeight="400"
          dropShadow="(0px 1px 4px rgba(0, 0, 0, 0.25))"
        >
          Create Task
        </Button>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TodoForm
              onSubmit={onSubmit}
              onClose={onClose}
              isLoading={isLoading(postTodoStatus)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTodo;
