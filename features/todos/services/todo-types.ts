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
}

export interface ITodoForm {
  title: string;
  description: string;
  status: TodoStatus;
}

// export interface ITodoCount

// export interface ITodoState {
//   allTodos: ITodo[];
//   getAllTodoStatus: ApiStatus;
//   postTodoStatus: ApiStatus;
//   postTodoError: null | SerializedError;
//   todoCounts: null | number[];
// }
