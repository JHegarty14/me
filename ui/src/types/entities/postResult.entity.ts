import { ContributorEntity } from './user.entity';

export type PostResultEntity = {
	uid: string;
	title: string;
	summary: string;
	created_at: string;
	contributor: ContributorEntity;
};
