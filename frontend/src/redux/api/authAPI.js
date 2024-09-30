/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setToken, setUserData } from '../../utils/Utils';
import { getMeAPI } from './getMeAPI';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth/`
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: 'register',
          method: 'POST',
          body: data
        };
      }
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          credentials: 'include'
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setToken(data.response.accessToken);
          setUserData(JSON.stringify(data.response.userData));
          await dispatch(getMeAPI.endpoints.getMe.initiate());
        } catch (error) {}
      }
    })
  })
});

export const { useLoginUserMutation, useRegisterUserMutation } = authAPI;
