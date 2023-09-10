import { NextApiResponse } from 'next';

const handleInvalidMethod = (res: NextApiResponse) => {
  return res.status(405).send({ message: 'Invalid Method' });
};

const handleAnErrorOccurred = (res: NextApiResponse) => {
  return res.status(500).send({ message: 'An error occurred' });
};

const handleInvalidToken = (res: NextApiResponse) => {
  return res.status(401).send({ message: 'Unauthorized' });
};

export { handleInvalidMethod, handleAnErrorOccurred, handleInvalidToken };
