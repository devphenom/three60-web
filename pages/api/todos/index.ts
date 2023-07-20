import { verifyToken } from '@utils/functions';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleInvalidMethod } from '@utils/error-handler';
import {
  createTodo_handler,
  getTodo_handler,
} from '@todos/services/todo-handler';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.headers['x-access-token'];

  const { userInfo } = verifyToken(token as string, res);

  switch (req.method) {
    case 'GET':
      getTodo_handler(req, res, userInfo);
      break;

    case 'POST':
      createTodo_handler(req, res, userInfo);
      break;

    default:
      handleInvalidMethod(res);
      break;
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
