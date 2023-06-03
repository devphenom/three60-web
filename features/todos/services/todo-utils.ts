import { SerializedError } from '@reduxjs/toolkit';

export const TODO_STATUS = Object.freeze({
  ALL_TODOS: { label: 'All Todos', value: 'ALL_TODOS' },
  BACKLOG: { label: 'Backlog', value: 'BACKLOG' },
  INPROGRESS: { label: 'In Progress', value: 'INPROGRESS' },
  FINISHED: { label: 'Finished', value: 'FINISHED' },
  OVERDUE: { label: 'Overdue', value: 'OVERDUE' },
  TRASH: { label: 'Trash', value: 'TRASH' },
});

export const defaultTodoStatus = {
  id: 0,
  description: 'All todos',
  count: 0,
};

// export enum TodoStatus {
//   'BACKLOG',
//   'INPROGRESS',
//   'OVERDUE',
//   'FINISHED',
//   'TRASH',
// }
