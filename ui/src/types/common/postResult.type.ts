import { Contributor } from './user.type';

export type PostResult = {
	uid: string;
	title: string;
	summary: string;
	createdAt: string;
	contributor: Contributor;
};
