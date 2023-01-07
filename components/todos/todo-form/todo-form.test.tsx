import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useLazyAxios from '@hooks/use-axios/use-axios';
import TodoForm from './todo-form';
import { testMount } from '@utils/testMount';

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

  const mountedTodoForm = testMount(<TodoForm onClose={() => null} />);

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

  testMount(<TodoForm onClose={() => null} />);

  expect(screen.getByLabelText(/Title/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
});

// test('should render a loading button', async () => {
//   mockUseLazyAxios.mockImplementation(() => [
//     () => Promise.resolve({ data: null, loading: true, error: null }),
//     {
//       data: null,
//       loading: true,
//       error: '',
//       cancel: () => null,
//     },
//   ]);

//   testMount(<TodoForm onClose={() => null} />);

//   const usernameInput = screen.getByLabelText(/Username/);
//   const passwordInput = screen.getByPlaceholderText('********');
//   const submitButton = screen.getByTestId(/sign-in-button/);

//   const testValue = 'iphenom011111111111';

//   await act(async () => {
//     fireEvent.change(usernameInput, { target: { value: testValue } });
//     fireEvent.change(passwordInput, { target: { value: testValue } });
//     fireEvent.click(submitButton);
//   });

//   expect(submitButton).toHaveTextContent('Loading');
// });

// test('should post to database', async () => {
//   mockUseLazyAxios
//     .mockReturnValueOnce([
//       () => Promise.resolve({ data: null, loading: false, error: null }),
//       {
//         data: null,
//         loading: false,
//         error: '',
//         cancel: () => null,
//       },
//     ])
//     .mockReturnValueOnce([
//       () =>
//         Promise.resolve({
//           data: { token: 'receive_token_from_backend', username: 'iphenom' },
//           loading: true,
//           error: null,
//         }),
//       {
//         data: { token: 'receive_token_from_backend', username: 'iphenom' },
//         loading: true,
//         error: '',
//         cancel: () => null,
//       },
//     ]);

//   testMount(<TodoForm onClose={() => null} />);

//   const submitButton = screen.getByTestId(/sign-in-button/);

//   expect(submitButton).not.toHaveTextContent('Loading');

//   await act(async () => {
//     fireEvent.click(submitButton);
//   });
//   expect(mockUseLazyAxios).toHaveBeenCalled();
// });
