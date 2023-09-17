import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongo-db';
import { UserTokenData } from '@auth/services/auth-types';
import Todos from './todos-schema';
import { handleAnErrorOccurred } from '@utils/error-handler';
import { ITodo, ITodoStatus } from './todo-types';
import { TODO_STATUS } from './todo-utils';
import TodosStatus from './todos-status-schema';
import { removeSpaces, toTitleCase } from '@utils/functions';

async function getTodo_handler(
  req: NextApiRequest,
  res: NextApiResponse,
  user: UserTokenData,
) {
  const { statusId, searchTerm, limit = 10, page = 1 } = req.query;

  try {
    await clientPromise();

    const filter = {
      userId: user._id,

      ...(!!Number(statusId) ? { statusId: statusId } : {}),
      ...(String(searchTerm).length > 0
        ? {
            $or: [
              { title: { $regex: searchTerm, $options: 'i' } },
              { description: { $regex: searchTerm, $options: 'i' } },
            ],
          }
        : {}),
    };

    let results: ITodo[] = await Todos.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const counts = await Todos.countDocuments(filter);

    results = JSON.parse(JSON.stringify(results));

    res.status(200).send({
      todos: results,
      totalPages: Math.ceil(counts / Number(limit)),
      currentPage: page,
    });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

async function createTodo_handler(
  req: NextApiRequest,
  res: NextApiResponse,
  user: UserTokenData,
) {
  try {
    await clientPromise();

    const { title, description, expiryDate } = req.body;

    const createTodo: ITodo = await Todos.create({
      title,
      description,
      expiryDate,
      userId: user._id,
    });

    res.status(200).send({ data: createTodo });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

async function getOneTodo_handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  try {
    await clientPromise();

    let todo: ITodo | null = await Todos.findOne({ _id: query.todoId });

    res.status(200).send(todo);
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

async function updateOneTodo_handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query, body } = req;
  try {
    await clientPromise();

    let todo = await Todos.findOne({ _id: query.todoId });
    const { _id, createdAt, updatedAt, ...rest } = body;

    const status = await TodosStatus.findOne({ id: rest.statusId });

    Object.keys(rest).forEach(async (key) => {
      todo[key] = rest[key];
    });

    await todo.save();

    res.status(200).send({ message: 'Success' });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

async function deleteOneTodo_handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req;
  try {
    await clientPromise();
    let todo = await Todos.findOne({ _id: query.todoId });
    todo.status = TODO_STATUS.TRASH.value;
    await todo.save();

    res.status(200).send({ message: 'Success' });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

async function todoCounts_handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userInfo: UserTokenData,
) {
  try {
    await clientPromise();

    let status = await TodosStatus.find();

    let aggregate = await Todos.aggregate([
      { $match: { userId: userInfo._id } },
      {
        $group: {
          _id: '$statusId',
          count: { $sum: 1 },
        },
      },
    ]);

    aggregate = aggregate.map((arr) => ({ id: arr._id, count: arr.count }));

    const result = JSON.parse(JSON.stringify(status)).map(
      (item: ITodoStatus) => {
        const count = aggregate.filter(({ id }) => id === item.id)?.[0]?.count;

        return {
          ...item,
          count: count ?? 0,
        };
      },
    );

    const allTodos = {
      ...result[0],
      id: 0,
      shortcode: 'ALLTODOS',
      description: 'All Todos',
      count: result.reduce((acc: number, cur: any) => acc + cur.count, 0),
    };

    res.status(200).send({ result: [allTodos, ...result] });
  } catch (error) {
    console.log(error);
    handleAnErrorOccurred(res);
  }
}

async function getTodoStatus_handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await clientPromise();

    const statuses = await TodosStatus.find();

    res.status(200).send({ status: statuses });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

async function addTodoStatus_handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await clientPromise();

    const { status } = req.body;

    // get the count of all status in the db
    const prev = await TodosStatus.count();

    const newStatus = await TodosStatus.create({
      id: prev + 1,
      shortcode: removeSpaces(status.toUpperCase()),
      description: toTitleCase(status),
    });

    res.status(200).send({ status: newStatus });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

async function updateTodoStatus_handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await clientPromise();

    const { id: statusId } = req.query;

    const status = await TodosStatus.findOne({ id: statusId });
    const { createdAt, updatedAt, id, ...rest } = status;

    Object.keys(req.body).forEach((key: string) => {
      status[key] = req.body[key];
    });

    status.save();

    res.status(200).send({ message: 'Success' });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

async function deleteTodoStatus_handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await clientPromise();

    const { id: statusId } = req.query;

    await TodosStatus.findOneAndDelete({ id: statusId });

    res.status(200).send({ message: 'Success' });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

export {
  getTodo_handler,
  createTodo_handler,
  getOneTodo_handler,
  updateOneTodo_handler,
  deleteOneTodo_handler,
  todoCounts_handler,
  getTodoStatus_handler,
  addTodoStatus_handler,
  updateTodoStatus_handler,
  deleteTodoStatus_handler,
};
