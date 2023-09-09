import { schedule } from '@netlify/functions';

const cronHandler = async (event: any, context: any) => {
  // Do something scheduled
  console.log('Scheduled function called');
  return {
    statusCode: 200,
    body: 'OK',
  };
};

const handler = schedule('* * * * *', cronHandler);

export { handler };
