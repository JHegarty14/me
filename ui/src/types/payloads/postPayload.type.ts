import { PostStatus } from '../common';

export type PostPayload = {
	title: string;
	summary: string;
	content: string;
	bannerSrc: string;
	createdAt: string;
	contributorUid: string;
	version: number;
	status: PostStatus;
};
