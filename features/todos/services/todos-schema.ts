import { Schema, model, models } from 'mongoose';

const todosSchema = new Schema(
  {
    id: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    statusId: {
      type: Number,
      default: 1,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Todos = models.todos || model('todos', todosSchema);
export default Todos;
