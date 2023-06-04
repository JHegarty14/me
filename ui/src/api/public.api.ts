import {
	Paginated,
	Post,
	PostEntity,
	PostResult,
	PostResultEntity,
	PostSearch,
} from '../types';
import { CaseConverter } from '../util';
import { baseApi } from './base.api';
import { buildQueryString } from './utils';

const publicApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getPostByUid: build.query<Post, string>({
			query: (uid: string) => `/posts/${uid}`,
			transformResponse: (response: PostEntity) => {
				return CaseConverter.convertKeysToCamelCase(response);
			},
		}),
		getPosts: build.query<PostResult[], PostSearch>({
			query: (query: PostSearch) => `/posts${buildQueryString(query)}`,
			transformResponse: (response: Paginated<PostResultEntity>) => {
				return response.data.map((post) => {
					return CaseConverter.convertKeysToCamelCase(post);
				});
			},
		}),
	}),
});

export const { useGetPostByUidQuery, useGetPostsQuery } = publicApi;
