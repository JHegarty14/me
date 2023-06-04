import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../types';
import type { RootState } from './configureStore';

const slice = createSlice({
	name: 'auth',
	initialState: {
		user: localStorage.getItem('user')
			? JSON.parse(localStorage.getItem('user') as string)
			: null,
		token: localStorage.getItem('token'),
	} as AuthState,
	reducers: {
		setCredentials: (
			state,
			{ payload: { user, token } }: PayloadAction<{ user: User; token: string }>
		) => {
			state.user = user;
			state.token = token;
		},
	},
});

export const { setCredentials } = slice.actions;

export const authReducer = slice.reducer;

export const selectCurrentUser = (state: RootState): User | null =>
	state.auth.user;
