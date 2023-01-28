import { Box, HStack } from '@chakra-ui/react';
import { Formik, FormikValues } from 'formik';
import React from 'react';
import { FormInput, FormTextarea } from '@components';
import { Button } from '@global';
import { TODO_FORM_VALIDATION_SCHEMA } from '../todo-services/todo-formValidation';

type Props = {
  onClose: () => void;
  onSubmit: (x: FormikValues) => void;
  isLoading?: boolean;
  onCancel?: () => void;
};

const TodoForm = ({ onClose, isLoading, onSubmit, onCancel }: Props) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={TODO_FORM_VALIDATION_SCHEMA}
      initialValues={{ title: '', description: '' }}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, errors, touched, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Box>
              <FormInput
                onChange={handleChange}
                mb={5}
                label="Title"
                name="title"
                placeholder="enter title"
                value={values.title}
                isInvalid={touched?.title && !!errors.title}
              />
              <FormTextarea
                onChange={handleChange}
                mb={5}
                label="Description"
                name="description"
                placeholder="enter description"
                value={values.description}
                isInvalid={touched?.description && !!errors.description}
              />

              <HStack justify={'space-between'} my="5">
                <Button
                  onClick={() => {
                    onClose();
                    onCancel?.();
                  }}
                  colorScheme="gray"
                  variant="outline"
                  borderRadius="999px"
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  borderRadius="999px"
                  colorScheme={'brand'}
                  type="submit"
                >
                  Submit
                </Button>
              </HStack>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default TodoForm;
