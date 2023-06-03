import { NextApiRequest, NextApiResponse } from 'next';
import { todoCounts_handler } from '@todos/services/todo-handler';
import { verifyToken } from '@utils/functions';
import { handleInvalidMethod } from '@utils/error-handler';

export default async function oneTodo(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.headers['x-access-token'];

  const { userInfo } = await verifyToken(token as string, res);

  switch (req.method) {
    case 'GET':
      todoCounts_handler(req, res, userInfo);
      break;
    default:
      handleInvalidMethod(res);
      break;
  }
}
