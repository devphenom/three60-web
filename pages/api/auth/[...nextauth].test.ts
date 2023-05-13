import { MongoClient } from 'mongodb';
import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import Users from '../../../libs/schema/users';
import cpromise from '../../../libs/mongo-db';
import authOptions from './[...nextauth]';

jest.mock('mongodb');
jest.mock('next-auth/providers/credentials');
jest.mock('next-auth/providers/google');
jest.mock('../../../libs/schema/users');
jest.mock('../../../libs/mongo-db');
jest.mock('bcryptjs');

const mockedMongoClient = MongoClient as jest.Mocked<typeof MongoClient>;
const mockedNextAuth = NextAuth as jest.MockedFunction<typeof NextAuth>;
const mockedCredentialsProvider = CredentialProvider as jest.MockedFunction<
  typeof CredentialProvider
>;
const mockedGoogleProvider = GoogleProvider as jest.MockedFunction<
  typeof GoogleProvider
>;
const mockedUsers = Users as jest.Mocked<typeof Users>;
const mockedCPromise = cpromise as jest.MockedFunction<typeof cpromise>;
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('Authentication Options', () => {
  let mockConnect: jest.Mock;
  let mockCreate: jest.Mock;
  let mockFindOne: jest.Mock;
  let mockHash: jest.Mock;
  let mockCompare: jest.Mock;

  beforeAll(() => {
    mockConnect = jest.fn();
    mockCreate = jest.fn();
    mockFindOne = jest.fn();
    mockHash = jest.fn();
    mockCompare = jest.fn();

    mockedMongoClient.connect.mockImplementation(mockConnect);
    mockedUsers.create.mockImplementation(mockCreate);
    mockedUsers.findOne.mockImplementation(mockFindOne);
    mockedBcrypt.hash.mockImplementation(mockHash);
    mockedBcrypt.compare.mockImplementation(mockCompare);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnect.mockResolvedValue(undefined);
    mockFindOne.mockResolvedValue(null);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should create the MongoDBAdapter with the client promise', async () => {
    const clientPromiseMock = jest.fn();
    await authOptions.adapter(clientPromiseMock);

    expect(MongoDBAdapter).toHaveBeenCalledWith(clientPromiseMock);
  });

  it('should create the credentials provider with the correct options', () => {
    expect(CredentialProvider).toHaveBeenCalledWith({
      type: 'credentials',
      credentials: {},
      authorize: expect.any(Function),
    });
  });

  it('should create the Google provider with the correct options', () => {
    expect(GoogleProvider).toHaveBeenCalledWith({
      clientId: expect.any(String),
      clientSecret: expect.any(String),
      allowDangerousEmailAccountLinking: true,
      profile: expect.any(Function),
    });
  });

  describe('Credentials Provider', () => {
    let authorizeFn: Function;

    beforeEach(() => {
      const credentialsProviderResult =
        mockedCredentialsProvider.mock.results[0].value;
      authorizeFn = credentialsProviderResult.authorize;
    });

    it('should create a user and return it for signUp action', async () => {
      const credentials = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        action: 'signUp',
      };

      mockHash.mockResolvedValue('hashedPassword');
      mockCompare.mockResolvedValue(true);

      await authorizeFn(credentials);

      expect(mockHash).toHaveBeenCalledWith('password', 10);
      expect(mockFindOne).toHaveBeenCalledWith({ email: 'testuser' });
      expect(mockCreate).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
      });
    });

    it('should verify the user and return it for signIn action', async () => {
      const credentials = {
        username: 'testuser',
        password: 'password',
        action: 'signIn',
      };

      mockCompare.mockResolvedValue(true);

      await authorizeFn(credentials);

      expect(mockFindOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(mockFindOne).toHaveBeenCalledWith({ email: 'testuser' });
    });

    it('should throw an error for an invalid action', async () => {
      const credentials = {
        username: 'testuser',
        password: 'password',
        action: 'invalid',
      };

      await expect(authorizeFn(credentials)).rejects.toThrow(
        'Invalid action: invalid',
      );
    });

    it('should throw an error for missing credentials', async () => {
      const credentials = {};

      await expect(authorizeFn(credentials)).rejects.toThrow(
        'Missing credentials',
      );
    });

    it('should throw an error for user not found', async () => {
      const credentials = {
        username: 'nonexistent',
        password: 'password',
        action: 'signIn',
      };

      await expect(authorizeFn(credentials)).rejects.toThrow(
        'User does not exist',
      );
    });

    it('should throw an error for incorrect password', async () => {
      const credentials = {
        username: 'testuser',
        password: 'incorrect',
        action: 'signIn',
      };

      mockCompare.mockResolvedValue(false);

      await expect(authorizeFn(credentials)).rejects.toThrow(
        'Incorrect password',
      );
    });

    it('should throw an error if an error occurs during user creation', async () => {
      const credentials = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        action: 'signUp',
      };

      mockHash.mockResolvedValue('hashedPassword');
      mockCompare.mockResolvedValue(true);
      mockCreate.mockRejectedValue(new Error('User creation error'));

      await expect(authorizeFn(credentials)).rejects.toThrow(
        'User creation error',
      );
    });
  });

  describe('Google Provider', () => {
    let profileFn: Function;
    let signInFn: Function;

    beforeEach(() => {
      const googleProviderResult = mockedGoogleProvider.mock.results[0].value;
      profileFn = googleProviderResult.profile;
      signInFn = authOptions.callbacks.signIn;
    });

    it('should return the user profile for the Google provider', () => {
      const profile = {
        sub: 'google-user-id',
        email: 'test@example.com',
        email_verified: true,
      };

      const result = profileFn(profile);

      expect(result).toEqual({
        id: 'google-user-id',
        email: 'test@example.com',
        username: 'test@example.com',
        emailVerified: true,
      });
    });

    it('should create a user if it does not exist during signIn callback', async () => {
      const user = { email: 'test@example.com', id: 'google-user-id' };
      mockFindOne.mockResolvedValue(null);

      const result = await signInFn({ user });

      expect(mockFindOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockCreate).toHaveBeenCalledWith({
        id: 'google-user-id',
        username: 'test@example.com',
        email: 'test@example.com',
        provider: 'Google',
      });
      expect(result).toBe(true);
    });

    it('should return true if the user already exists during signIn callback', async () => {
      const user = { email: 'test@example.com', id: 'google-user-id' };
      mockFindOne.mockResolvedValue(user);

      const result = await signInFn({ user });

      expect(mockFindOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockCreate).not.toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false and log error if an error occurs during user creation', async () => {
      const user = { email: 'test@example.com', id: 'google-user-id' };
      mockFindOne.mockResolvedValue(null);
      mockCreate.mockRejectedValue(new Error('User creation error'));
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const result = await signInFn({ user });

      expect(mockFindOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockCreate).toHaveBeenCalledWith({
        id: 'google-user-id',
        username: 'test@example.com',
        email: 'test@example.com',
        provider: 'Google',
      });
      expect(consoleSpy).toHaveBeenCalledWith(new Error('User creation error'));
      expect(result).toBe(false);

      consoleSpy.mockRestore();
    });
  });
});
