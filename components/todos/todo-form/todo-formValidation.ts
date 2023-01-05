import * as yup from 'yup';

export const TODO_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().trim().required('Todo title is required.'),
  description: yup
    .string()
    .trim()
    .required('Description is required')
    .max(255, (val) => `Description cannot be more than ${val}`),
});
