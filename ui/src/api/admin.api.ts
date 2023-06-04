import { baseApi } from './base.api';
import {
	LoginPayload,
	Paginated,
	Pagination,
	Post,
	PostEntity,
	PostPayload,
	PostResult,
	PostResultEntity,
	User,
	UserEntity,
	UserResponse,
	UserResponseEntity,
} from '../types';
import { CaseConverter } from '../util';
import { buildQueryString } from './utils';

const adminApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<UserResponse, LoginPayload>({
			query: (body) => ({
				url: '/admin/login',
				method: 'POST',
				body: CaseConverter.convertKeysToSnakeCase(body),
			}),
			transformResponse: (response: UserResponseEntity) => {
				return CaseConverter.convertKeysToCamelCase(response);
			},
		}),
		logout: build.mutation({
			query: () => ({
				url: '/admin/logout',
				method: 'POST',
			}),
		}),
		createUser: build.mutation<User, User>({
			query: (body) => ({
				url: '/admin/users',
				method: 'POST',
				body: CaseConverter,
			}),
			transformResponse: (response: UserEntity) => {
				return CaseConverter.convertKeysToCamelCase(response);
			},
		}),
		updateUser: build.mutation<User, Partial<User>>({
			query: ({ uid, ...body }) => ({
				url: `/admin/users/${uid}`,
				method: 'PUT',
				body: CaseConverter.convertKeysToSnakeCase(body),
			}),
			transformResponse: (response: UserEntity) => {
				return CaseConverter.convertKeysToCamelCase(response);
			},
		}),
		deleteUser: build.mutation<void, string>({
			query: (uid) => ({
				url: `/admin/users/${uid}`,
				method: 'DELETE',
			}),
		}),
		createPost: build.mutation<Post, PostPayload>({
			query: (body) => ({
				url: '/admin/posts',
				method: 'POST',
				body: CaseConverter.convertKeysToSnakeCase(body),
			}),
			transformResponse: (response: PostEntity) => {
				return CaseConverter.convertKeysToCamelCase(response);
			},
		}),
		updatePost: build.mutation<Post, Partial<PostPayload> & { uid: string }>({
			query: ({ uid, ...body }) => ({
				url: `/admin/posts/${uid}`,
				method: 'PUT',
				body: CaseConverter.convertKeysToSnakeCase(body),
			}),
			transformResponse: (response: PostEntity) => {
				return CaseConverter.convertKeysToCamelCase(response);
			},
		}),
		getAdminPosts: build.query<PostResult[], Pagination>({
			query: (query) => ({
				url: `/admin/posts${buildQueryString(query)}`,
				method: 'GET',
			}),
			transformResponse: (response: Paginated<PostResultEntity>) => {
				return response.data.map((p) =>
					CaseConverter.convertKeysToCamelCase(p)
				);
			},
		}),
		getVersionedPost: build.query<Post, { uid: string; version: number }>({
			query: ({ uid, version }) => ({
				url: `/admin/posts/${uid}?version=${version}`,
				method: 'GET',
			}),
			transformResponse: (response: PostEntity) => {
				return CaseConverter.convertKeysToCamelCase(response);
			},
		}),
		deletePost: build.mutation<void, string>({
			query: (uid) => ({
				url: `/admin/posts/${uid}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useCreatePostMutation,
	useGetAdminPostsQuery,
	useDeletePostMutation,
	useGetVersionedPostQuery,
	useUpdatePostMutation,
} = adminApi;
