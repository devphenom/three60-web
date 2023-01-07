import { Box, HStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';
import { FormInput, FormTextarea } from '@components';
import { Button } from '@global';
import { TODO_FORM_VALIDATION_SCHEMA } from './todo-formValidation';

type Props = {
  onClose: () => void;
};

const TodoForm = ({ onClose }: Props) => {
  return (
    <Formik
      enableReinitialize
      validationSchema={TODO_FORM_VALIDATION_SCHEMA}
      initialValues={{ title: '', description: '' }}
      onSubmit={(values) => console.log(values)}
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
                  onClick={onClose}
                  colorScheme="gray"
                  variant="outline"
                  borderRadius="999px"
                >
                  Cancel
                </Button>
                <Button
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
