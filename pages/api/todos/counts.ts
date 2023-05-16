import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

import Todos from '@libs/schema/todos';
import clientPromise from '@libs/mongo-db';
import { authOptions } from '../auth/[...nextauth]';
import { ITodo, TODO_STATUS } from '@features/todos/todo-services/todo-utils';

export default async function counts(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;

  const session = await getServerSession(req, res, authOptions);

  // if (!session) {
  //   res.status(400).send({ message: 'Unauthorized' });
  // }
  await clientPromise();

  switch (method) {
    case 'GET':
      try {
        let results: ITodo[] = await Todos.find({ userId: null });

        const todos = results.filter((todo: any) => {
          todo._id = todo._id.toString();
          return todo;
        });

        const backlogCount = todos.filter(
          (todo: ITodo) => todo.status === TODO_STATUS.BACKLOG.value,
        );

        const inProgressCount = todos.filter(
          (todo: ITodo) => todo.status === TODO_STATUS.INPROGRESS.value,
        );

        const finishedCount = todos.filter(
          (todo: ITodo) => todo.status === TODO_STATUS.FINISHED.value,
        );
        const overdueCount = todos.filter(
          (todo: ITodo) => todo.status === TODO_STATUS.OVERDUE.value,
        );
        const trashCount = todos.filter(
          (todo: ITodo) => todo.status === TODO_STATUS.TRASH.value,
        );

        const payload = {
          count: {
            allTodos: todos.length,
            backlog: backlogCount.length,
            inProgress: inProgressCount.length,
            finished: finishedCount.length,
            overdue: overdueCount.length,
            trash: trashCount.length,
          },
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
