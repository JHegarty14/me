import { User } from './user.type';

export type AuthState = {
	user: User | null;
	token: string | null;
};
