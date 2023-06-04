import { Contributor } from './user.type';

export type Post = {
	uid: string;
	title: string;
	summary: string;
	content: string;
	bannerSrc: string;
	createdAt: string;
	updatedAt: string | null;
	contributor: Contributor;
	version: number;
};
