export type ResponseMeta = {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
};

export type Paginated<T> = {
	data: T[];
	meta: ResponseMeta;
};
