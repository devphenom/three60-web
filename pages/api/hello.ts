import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../utils/mongo-db';
import Todos from '../../features/todos/services/todos-schema';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await clientPromise();
    const Todo = await Todos.findById('64fd0bfbe0b04794c4f35428');

    const updatedTodos = await Todos.updateMany(
      {
        statusId: { $in: [1, 2] },
        expiryDate: { $lt: new Date() },
      },
      { $set: { statusId: 4 } },
    );

    res
      .status(200)
      .send({ jj: new Date('2023-09-21T23:45:00.000Z') < new Date() });
  } catch (error) {
    res.status(500).send(error);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
