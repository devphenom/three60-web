import { Schema, model, models } from 'mongoose';

export const todosStatusSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    shortcode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const TodosStatus =
  models.todosStatus || model('todosStatus', todosStatusSchema);
export default TodosStatus;
