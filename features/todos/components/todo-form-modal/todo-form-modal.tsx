import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import TodoForm from '@todos/components/todo-form/todo-form';
import { ITodoForm, TTodoFormModalProps } from '@todos/services/todo-types';
import { FormikValues } from 'formik';

const TodoFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isSubmitting,
}: TTodoFormModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TodoForm
            onSubmit={onSubmit}
            onClose={onClose}
            isLoading={isSubmitting}
            initialValues={initialValues}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TodoFormModal;
