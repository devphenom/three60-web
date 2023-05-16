import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import Todos from '@libs/schema/todos';
import clientPromise from '@libs/mongo-db';
import { TODO_STATUS } from '@features/todos/todo-services/todo-utils';

export default async function todo(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  await clientPromise();

  switch (method) {
    case 'GET':
      try {
        let todo = await Todos.findOne({ _id: query.todoId });

        res.status(200).send(todo);
      } catch (error: any) {
        const payload = {
          message: error.message,
        };
        res.status(400).send(payload);
      }
      break;

    case 'PUT':
      try {
        let todo = await Todos.findOne({ _id: query.todoId });
        const { _id, createdAt, updatedAt, ...rest } = body;

        Object.keys(rest).forEach((key) => {
          todo[key] = rest[key];
        });

        await todo.save();

        // get updated counts
        const response = await axios.get(
          'http://localhost:3000/api/todos/counts',
        );

        const payload = {
          todo,
          counts: response.data.count,
        };

        res.status(200).send(payload);
      } catch (error: any) {
        const payload = {
          message: error.message,
        };
        res.status(400).send(payload);
      }
      break;
    case 'DELETE':
      try {
        let todo = await Todos.findOne({ _id: query.todoId });

        todo.status = TODO_STATUS.TRASH.value;
        await todo.save();

        // get updated counts
        const response = await axios.get(
          'http://localhost:3000/api/todos/counts',
        );

        const payload = {
          message: 'Success',
          counts: response.data.count,
        };
        res.status(200).send(payload);
      } catch (error: any) {
        const payload = {
          message: error.message,
        };
        res.status(400).send(payload);
      }
      break;
  }
}
