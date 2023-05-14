import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoClient } from 'mongodb';
import Users from '../../../libs/schema/users';
import cpromise from '../../../libs/mongo-db';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);
const clientPromise = client.connect();

async function createUser(username: string, email: string, password: string) {
  const existingUserByEmail = await Users.findOne({ email: username });
  const existingUserByUsername = await Users.findOne({ username });

  if (existingUserByEmail) {
    throw new Error('Email already exists');
  }

  if (existingUserByUsername) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Users.create({ username, email, password: hashedPassword });
}

async function verifyUser(username: string, password: string) {
  let user = await Users.findOne({ username });

  if (!user) {
    user = await Users.findOne({ email: username });
  }

  if (!user) {
    throw new Error('User does not exist');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Incorrect password');
  }

  return user;
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { username, password, email, action } = credentials as {
          username: string;
          password: string;
          email: string;
          action: 'signUp' | 'signIn';
        };

        await cpromise();

        try {
          switch (action) {
            case 'signUp':
              await createUser(username, email, password);
              const newUser = await verifyUser(username, password);
              return newUser;
            case 'signIn':
              const user = await verifyUser(username, password);
              return user;
            default:
              throw new Error('Invalid action: ' + action);
          }
        } catch (error) {
          const errorMessage = (error as Error).message;
          throw new Error(errorMessage);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,

      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          username: profile.email,
          emailVerified: profile.email_verified,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...user,
        },
      };
    },
    async signIn({ user, account, profile }) {
      const { email, id } = user;

      await cpromise();

      try {
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
          return true;
        }
        await Users.create({ id, username: email, email, provider: 'Google' });
      } catch (error) {
        console.log(error);
        return false;
      }

      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signin',
  },
};

export default NextAuth(authOptions);
