import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@libs/mongo-db';
import Todos from '@libs/schema/todos';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import axios from 'axios';

export default async function todoHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;
  const { userId, status } = query;

  const session = await getServerSession(req, res, authOptions);
  console.log('session', session);

  // if (!session) {
  //   res.status(400).send({ message: 'Unauthorized' });
  // }
  await clientPromise();

  switch (method) {
    case 'GET':
      try {
        let result: any = await Todos.find({ userId });

        result = JSON.parse(JSON.stringify(result));

        const todos = result.filter((todo: any) => {
          todo._id = todo._id.toString();
          return todo;
        });

        // get updated counts
        const response = await axios.get(
          'http://localhost:3000/api/todos/counts',
        );

        const payload = {
          todos,
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
    case 'POST':
      try {
        const { title, description } = req.body;
        const createdTodo = await Todos.create({ title, description });
        const payload = {
          data: createdTodo,
        };

        res.status(200).send(payload);
      } catch (error) {
        res.status(400).send(error);
      }
      break;
  }
}
