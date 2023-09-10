import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@utils/mongo-db';
import { handleAnErrorOccurred } from '@utils/error-handler';

import Users from './users-schema';

const generateToken = (userInfo: any) => {
  return jwt.sign({ userInfo }, process.env.JWT_SECRET || '', {
    expiresIn: '30d',
  });
};

const getFrontendUserData = (user: any) => {
  const { _id, username, email } = user;

  return { _id, username, email };
};

async function register_handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await clientPromise();
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .send({ message: 'Username and password are required' });
    }

    const existingUserByEmail = await Users.findOne({ email });

    if (existingUserByEmail) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const existingUserByUsername = await Users.findOne({ username });

    if (existingUserByUsername) {
      return res.status(400).send({ message: 'Username already exists' });
    }

    // generate a salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res
          .status(500)
          .send({ message: 'An error occurred during registration' });
        return;
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          res
            .status(500)
            .send({ message: 'An error occurred during registration' });
          return;
        }

        const user = {
          username,
          email,
          provider: 'credentials',
          password: hash,
        };

        // save user information to database
        const newUser = await Users.create(user);

        // get user information needed in frontend
        const userInfo = getFrontendUserData(newUser._doc);

        // generate token
        const token = generateToken(userInfo);
        res
          .status(200)
          .send({ message: 'User registered successfully', token });
        return;
      });
    });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

async function signin_handler(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise();

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send({ message: 'Username and password are required' });
    }

    let user = await Users.findOne({ username });

    if (!user) {
      user = await Users.findOne({ email: username });
    }

    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).send({ message: 'An error occurred during login' });
        return;
      }

      if (!isMatch) {
        res.status(401).send({ message: 'Invalid username or password' });
        return;
      }

      // get user information needed in frontend
      const userInfo = getFrontendUserData(user);

      const token = generateToken(userInfo);

      res.status(200).send({ message: 'Login successful', token });
    });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

async function google_auth_handler(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise();

  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({ message: 'Token is required' });
    }

    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        params: { access_token: token, alt: 'json' },
      },
    );

    const {
      data: { email, given_name },
    } = response;

    const user = await Users.findOne({ email: email });
    if (user) {
      if (user.provider !== 'google') {
        return res
          .status(403)
          .send({ message: 'Please, Sign in using your credentials' });
      }

      // get user information needed in frontend
      const userInfo = getFrontendUserData(user);

      // generate token return response
      const newToken = generateToken(userInfo);

      return res
        .status(200)
        .send({ message: 'Signed In Successfully', token: newToken });
    }

    const newUser = await Users.create({
      email,
      username: given_name,
      provider: 'google',
    });

    // get user information needed in frontend
    const userInfo = getFrontendUserData(newUser._doc);

    const newToken = generateToken(userInfo);

    return res
      .status(200)
      .send({ message: 'Signed In  Successfully', token: newToken });
  } catch (error) {
    handleAnErrorOccurred(res);
  }
}

export { register_handler, signin_handler, google_auth_handler };
