import { Schema, model, models } from 'mongoose';
import {
  TODO_STATUS,
  TodoStatus,
} from '../../features/todos/todo-services/todo-utils';

const todosSchema = new Schema(
  {
    id: String,
    title: String,
    description: String,
    userId: String,
    status: {
      type: String,
      default: TODO_STATUS.BACKLOG.value,
    },
  },
  {
    timestamps: true,
  },
);

const Todos = models.todos || model('todos', todosSchema);
export default Todos;
