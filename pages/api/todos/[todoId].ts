import { NextApiRequest, NextApiResponse } from 'next';

import { verifyToken } from '@utils/functions';
import { handleInvalidMethod } from '@utils/error-handler';
import {
  deleteOneTodo_handler,
  getOneTodo_handler,
  updateOneTodo_handler,
} from '@todos/services/todo-handler';

export default async function oneTodo(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.headers['x-access-token'];

  const { userInfo } = verifyToken(token as string, res);

  switch (req.method) {
    case 'GET':
      getOneTodo_handler(req, res);
      break;
    case 'PATCH':
      updateOneTodo_handler(req, res);
      break;
    case 'DELETE':
      deleteOneTodo_handler(req, res);
      break;
    default:
      handleInvalidMethod(res);
      break;
  }
}
