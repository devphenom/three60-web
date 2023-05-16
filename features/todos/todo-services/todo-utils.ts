import { SerializedError } from '@reduxjs/toolkit';
import { ApiStatus } from '../../../types';

export const TODO_STATUS = Object.freeze({
  ALL_TODOS: { label: 'All Todos', value: 'ALL_TODOS' },
  BACKLOG: { label: 'Backlog', value: 'BACKLOG' },
  INPROGRESS: { label: 'In Progress', value: 'INPROGRESS' },
  FINISHED: { label: 'Finished', value: 'FINISHED' },
  OVERDUE: { label: 'Overdue', value: 'OVERDUE' },
  TRASH: { label: 'Trash', value: 'TRASH' },
});

// export enum TodoStatus {
//   'BACKLOG',
//   'INPROGRESS',
//   'OVERDUE',
//   'FINISHED',
//   'TRASH',
// }

export type TodoStatus =
  | 'BACKLOG'
  | 'INPROGRESS'
  | 'OVERDUE'
  | 'FINISHED'
  | 'TRASH';

export interface ITodoForm {
  title: string;
  description: string;
  status: TodoStatus;
}

export interface ITodo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ITodoCount {
  id: number;
  title: string;
  value: number;
}

export interface ITodoState {
  allTodos: ITodo[];
  getAllTodoStatus: ApiStatus;
  postTodoStatus: ApiStatus;
  postTodoError: null | SerializedError;
  todoCounts: null | ITodoCount[];
}
