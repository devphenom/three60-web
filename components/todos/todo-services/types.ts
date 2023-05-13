import { SerializedError } from '@reduxjs/toolkit';
import { ApiStatus } from '../../../types';

export enum TodoStatus {
  'Backlog',
  'In Progress',
  'Over Due',
  'Finished',
  'Trash',
}

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
  created: string;
  updated: string;
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
