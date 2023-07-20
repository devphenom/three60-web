import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from '@redux/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),

    signIn: builder.mutation({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),

    googleAuth: builder.mutation({
      query: (token) => ({
        url: 'auth/google',
        method: 'POST',
        body: token,
      }),
    }),
  }),
});

export const { useRegisterMutation, useSignInMutation, useGoogleAuthMutation } =
  authApi;
