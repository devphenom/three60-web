import { Box, HStack } from '@chakra-ui/react';
import { Formik, FormikValues } from 'formik';
import { useEffect, useState } from 'react';
import { FormInput, FormTextarea } from '@components';
import { Button } from '@global';
import { TODO_FORM_VALIDATION_SCHEMA } from '../../services/todo-form-validation';
import { ITodoForm, TTodoFormProps } from '@todos/services/todo-types';
import FormDateTimeInput from '../../../../components/form-date-time-input/form-date-time-input';

const TodoForm = ({
  onClose,
  isLoading,
  onSubmit,
  onCancel,
  initialValues,
}: TTodoFormProps) => {
  const [formValues, setFormValues] = useState<ITodoForm>({
    title: '',
    description: '',
    expiryDate: new Date(Date.now()),
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
    }
  }, [initialValues]);

  return (
    <Formik
      enableReinitialize
      validationSchema={TODO_FORM_VALIDATION_SCHEMA}
      initialValues={formValues}
      onSubmit={onSubmit}
    >
      {({
        values,
        handleChange,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
      }) => {
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
              <FormDateTimeInput
                label="Expiry Date"
                name="expiryDate"
                value={values.expiryDate}
                minDate={new Date()}
                placeholder="Pick date & time"
                isInvalid={touched?.expiryDate && !!errors.expiryDate}
                validationMessage={touched.expiryDate && errors.expiryDate}
                onChange={(date) => {
                  setFieldValue('expiryDate', date);
                }}
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
