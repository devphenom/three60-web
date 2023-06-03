import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useLazyAxios from '@hooks/use-axios/use-axios';
import TodoForm from './todo-form';
import { testMount } from '@utils/testMount';
import { FormikValues } from 'formik';

jest.mock('@hooks/use-axios/use-axios');

const mockUseLazyAxios = useLazyAxios as jest.MockedFunction<
  typeof useLazyAxios
>;

test('should render  without crashing', () => {
  mockUseLazyAxios.mockReturnValue([
    () => Promise.resolve({ data: null, loading: false, error: null }),
    {
      data: null,
      loading: false,
      error: '',
      cancel: () => null,
    },
  ]);

  const mountedTodoForm = testMount(
    <TodoForm
      onClose={() => null}
      onSubmit={function (x: FormikValues): void {
        throw new Error('Function not implemented.');
      }}
      isLoading={false}
      onCancel={function (): void {
        throw new Error('Function not implemented.');
      }}
    />,
  );

  expect(mountedTodoForm).toBeTruthy();
});

test('should render signin form', async () => {
  mockUseLazyAxios.mockReturnValue([
    () => Promise.resolve({ data: null, loading: false, error: null }),
    {
      data: null,
      loading: false,
      error: '',
      cancel: () => null,
    },
  ]);

  testMount(
    <TodoForm
      onClose={() => null}
      onSubmit={function (x: FormikValues): void {
        throw new Error('Function not implemented.');
      }}
      isLoading={false}
      onCancel={function (): void {
        throw new Error('Function not implemented.');
      }}
    />,
  );

  expect(screen.getByLabelText(/Title/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
});
