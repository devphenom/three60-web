import { NextApiRequest, NextApiResponse } from 'next';
import { handleInvalidMethod } from '@utils/error-handler';
import { google_auth_handler } from '@auth/services/auth-handler';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    handleInvalidMethod(res);
  }

  google_auth_handler(req, res);
}

export const config = {
  api: {
    externalResolver: true,
  },
};
