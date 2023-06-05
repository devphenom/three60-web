import { createSlice } from '@reduxjs/toolkit';
import { todoApi } from './todo-api';
import { ITodoStatus } from '@todos/services/todo-types';
import { defaultTodoStatus } from '@todos/services/todo-utils';
// import { ITodoState } from '@todos/services/todo-utils';

interface ITodoReducer {
  todoCounts: null | ITodoStatus[];
  currentStatus: Partial<ITodoStatus>;
}

const initialState: ITodoReducer = {
  todoCounts: null,
  currentStatus: defaultTodoStatus,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setCurrentStatus: (state, { payload }: { payload: ITodoStatus }) => {
      state.currentStatus = payload;
    },
  },
  extraReducers: (builder) => {
    // get all todos
    // builder.addCase(getAllTodosAction.pending, (state) => {
    //   state.getAllTodoStatus = ApiStatus.loading;
    // });
    // builder.addCase(getAllTodosAction.rejected, (state) => {
    //   state.getAllTodoStatus = ApiStatus.error;
    // });
    // builder.addCase(getAllTodosAction.fulfilled, (state, action) => {
    //   state.getAllTodoStatus = ApiStatus.success;
    //   state.allTodos = action.payload.results;
    //   state.todoCounts = action.payload.counts;
    // });

    builder.addMatcher(
      todoApi.endpoints.getTodoCounts.matchFulfilled,
      (state, action) => {
        state.todoCounts = action.payload.result;
        // state.currentStatus = action.payload.result[0];
      },
    );

    // post todo
    // builder.addCase(postTodoAction.pending, (state) => {
    //   state.postTodoStatus = ApiStatus.loading;
    // });
    // builder.addCase(postTodoAction.rejected, (state, action) => {
    //   state.postTodoStatus = ApiStatus.error;
    //   if (action.payload) {
    //     state.postTodoError = action.payload;
    //   }
    // });
    // builder.addCase(postTodoAction.fulfilled, (state, action) => {
    //   state.postTodoStatus = ApiStatus.success;
    //   // state.allTodos = [...state.allTodos, action.payload];
    //   state.postTodoError = null;
    //   toaster.success('Todo created successfully');
    // });
  },
});

export const { setCurrentStatus } = todoSlice.actions;

export default todoSlice.reducer;
