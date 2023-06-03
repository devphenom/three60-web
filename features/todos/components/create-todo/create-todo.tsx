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
import { useAppDispatch } from '@redux/hooks';

import TodoForm from '../todo-form/todo-form';
import { usePostTodoMutation } from '@todos/redux/todo-api';

type Props = {};

const CreateTodo = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [postTodo, { isLoading }] = usePostTodoMutation();

  const onSubmit = async (values: FormikValues) => {
    await postTodo(values);
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
              isLoading={isLoading}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTodo;
