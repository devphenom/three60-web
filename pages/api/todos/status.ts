import { NextApiRequest, NextApiResponse } from 'next';

import {
  addTodoStatus_handler,
  deleteTodoStatus_handler,
  getTodoStatus_handler,
  updateTodoStatus_handler,
} from '@todos/services/todo-handler';
import { handleInvalidMethod } from '@utils/error-handler';

export default async function todosStatusApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      getTodoStatus_handler(req, res);
      break;
    case 'POST':
      addTodoStatus_handler(req, res);
      break;
    case 'DELETE':
      deleteTodoStatus_handler(req, res);
      break;
    case 'PATCH':
      updateTodoStatus_handler(req, res);
      break;
    default:
      handleInvalidMethod(res);
      break;
  }
}
