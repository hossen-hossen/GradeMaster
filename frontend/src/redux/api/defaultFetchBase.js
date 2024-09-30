import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { logout } from './userSlice';
import {
  getToken,
  removeToken,
  removeUserData,
  setToken,
  setUserData,
  removeCookie,
} from '../../utils/Utils';

const baseUrl = `${process.env.REACT_APP_SERVER_ENDPOINT}/api`;

// Create a new mutex to prevent multiple refresh requests
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const accessToken = getToken();
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const defaultFetchBase = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.originalStatus === 401)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResponse = await baseQuery(
          { url: 'auth/refreshToken', credentials: 'include' },
          api,
          extraOptions
        );

        if (refreshResponse.data) {
          const refreshResult = refreshResponse.data;
          setToken(refreshResult.accessToken);
          setUserData(JSON.stringify(refreshResult.userData));
          result = await baseQuery(args, api, extraOptions); // Retry original request
        } else {
          // Handle token refresh failure
          removeToken();
          removeUserData();
          removeCookie('refreshToken');
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default defaultFetchBase;
