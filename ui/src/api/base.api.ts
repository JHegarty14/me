import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
});
