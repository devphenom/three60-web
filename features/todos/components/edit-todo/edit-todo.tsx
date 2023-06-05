import { Container, useDisclosure } from '@chakra-ui/react';
import React, { ReactElement, ReactNode } from 'react';
import { Button } from '@global';
import TodoFormModal from '../todo-form-modal/todo-form-modal';
import { FormikValues } from 'formik';
import { useUpdateTodoMutation } from '../../redux/todo-api';
import { ITodo } from '@todos/services/todo-types';
import { IEditTodoProps } from '../../services/todo-types';

const EditTodo = ({ children, item }: IEditTodoProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const onSubmit = async (values: FormikValues) => {
    await updateTodo({ ...item, ...values });
    onClose();
  };

  return (
    <>
      {children(onOpen)}
      <TodoFormModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        isSubmitting={isLoading}
        initialValues={{
          title: item.title,
          description: item.description,
        }}
      />
    </>
  );
};

export default EditTodo;
