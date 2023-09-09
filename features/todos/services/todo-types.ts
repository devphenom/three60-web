import { FormikValues } from 'formik';

export type TodoStatus =
  | 'BACKLOG'
  | 'INPROGRESS'
  | 'OVERDUE'
  | 'FINISHED'
  | 'TRASH';

export interface ITodoStatus {
  id: number;
  shortcode: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  count?: number;
}

export interface ITodo {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: ITodoStatus;
  statusId: number;
  createdAt: string;
  updatedAt: string;
  expiryDate: string;
}

export interface ITodoForm {
  title: string;
  description: string;
}

export type TTodoFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: FormikValues) => void;
  initialValues?: ITodoForm;
  isSubmitting: boolean;
};

export type TTodoFormProps = {
  onClose: () => void;
  onSubmit: (x: FormikValues) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  initialValues?: ITodoForm;
};

export interface IEditTodoProps {
  children?: any;
  item: ITodo;
}

export type TTodoCardProps = { item: ITodo };

export interface ITodoReducer {
  todoCounts: null | ITodoStatus[];
  currentStatus: Partial<ITodoStatus>;
  searchTerm: string;
}

// export interface ITodoCount

// export interface ITodoState {
//   allTodos: ITodo[];
//   getAllTodoStatus: ApiStatus;
//   postTodoStatus: ApiStatus;
//   postTodoError: null | SerializedError;
//   todoCounts: null | number[];
// }
