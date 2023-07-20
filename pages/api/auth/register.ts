import { NextApiRequest, NextApiResponse } from 'next';
import { handleInvalidMethod } from '@utils/error-handler';
import { register_handler } from '@auth/services/auth-handler';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    handleInvalidMethod(res);
  }

  register_handler(req, res);
}

export const config = {
  api: {
    externalResolver: true,
  },
};
