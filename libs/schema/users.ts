import { Schema, model, models } from 'mongoose';

const usersSchema = new Schema(
  {
    id: String,
    username: String,
    password: String,
    email: String,
  },
  {
    timestamps: true,
  },
);

const Users = models.users || model('users', usersSchema);
export default Users;
