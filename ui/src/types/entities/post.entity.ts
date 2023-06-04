import { ContributorEntity } from './user.entity';

export type PostEntity = {
	uid: string;
	title: string;
	summary: string;
	content: string;
	banner_src: string;
	created_at: string;
	updated_at: string | null;
	contributor: ContributorEntity;
	version: number;
};
