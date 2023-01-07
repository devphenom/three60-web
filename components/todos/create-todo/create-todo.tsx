import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  HStack,
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
import { useLazyAxios, useToaster } from '@hooks';

import TodoForm from '../todo-form/todo-form';

type Props = {};

const CreateTodo = (props: Props) => {
  const toaster = useToaster();
  // const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createTodo, { loading, cancel }] = useLazyAxios(
    '/todo/create/',
    'POST',
  );

  const onSubmit = async (values: FormikValues) => {
    const { data, error } = await createTodo(values);

    if (data) {
      // dispatch();
      toaster.success('Todo created successfully');
      onClose();
    }
    if (error) {
      toaster.danger(error);
    }
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
              isLoading={loading}
              onSubmit={onSubmit}
              onClose={onClose}
              onCancel={cancel}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTodo;
