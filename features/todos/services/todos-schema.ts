import { Schema, model, models } from 'mongoose';
import TodosStatus, { todosStatusSchema } from './todos-status-schema';

const todosSchema = new Schema(
  {
    id: String,
    title: String,
    description: String,
    userId: String,
    statusId: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

const Todos = models.todos || model('todos', todosSchema);
export default Todos;
