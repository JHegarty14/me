import { Pagination } from './pagination.type';

export type PostSearch = {
	contributorUid?: string[];
	textMatch?: string;
	dateFrom?: Date;
	dateTo?: Date;
} & Pagination;
