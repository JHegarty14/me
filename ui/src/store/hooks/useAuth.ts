import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../authSlice';
import { User } from '../../types';

export const useAuth = (): { user: User | null } => {
	const user = useSelector(selectCurrentUser);

	return useMemo(() => ({ user }), [user]);
};
