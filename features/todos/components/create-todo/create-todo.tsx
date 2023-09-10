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
import TodoFormModal from '../todo-form-modal/todo-form-modal';

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
      <TodoFormModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        isSubmitting={isLoading}
      />
    </>
  );
};

export default CreateTodo;
