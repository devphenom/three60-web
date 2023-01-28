import { getAllTodos } from '@components/todos/todo-services/todo-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus } from '../../types';

const initialState = {
  allTodos: [],
  getAllTodosStatus: ApiStatus.loading,
};

export const getAllTodosAction = createAsyncThunk(
  'todos/fetchTodosAction',
  async () => {
    const response = await getAllTodos();

    return response.data.results;
  },
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all all
    builder.addCase(getAllTodosAction.pending, (state) => {
      state.getAllTodosStatus = ApiStatus.loading;
    });
    builder.addCase(getAllTodosAction.rejected, (state) => {
      state.getAllTodosStatus = ApiStatus.error;
    });
    builder.addCase(getAllTodosAction.fulfilled, (state, action) => {
      state.getAllTodosStatus = ApiStatus.success;
      state.allTodos = action.payload;
    });
  },
});

// export const {} = todoSlice.actions;

export default todoSlice.reducer;
