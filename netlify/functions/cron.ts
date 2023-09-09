import { schedule, HandlerEvent, HandlerContext } from '@netlify/functions';
import clientPromise from '../../utils/mongo-db';
import Todos from '../../features/todos/services/todos-schema';

const cronHandler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    await clientPromise();
    const updatedTodos = await Todos.updateMany(
      {
        statusId: { $in: [1, 2] },
        // todoEndTime: { $lt: new Date() }, // TODO: uncomment this when todo end time is initialized.
      },
      { $set: { statusId: 4 } },
    );

    return {
      statusCode: 200,
      body: 'OK',
    };
  } catch (error) {
    return { statusCode: 500, error: 'An error occurred' };
  }
};

const handler = schedule('@hourly', cronHandler);

export { handler };
