/* eslint-disable @typescript-eslint/no-misused-promises */
import { useNavigate } from 'react-router-dom';
import styles from './AdminIndex.module.scss';
import { useAuth } from '../../store/hooks';
import { PostPayload, PostResult } from '../../types';
import {
	useGetAdminPostsQuery,
	useCreatePostMutation,
	useDeletePostMutation,
} from '../../api/admin.api';

export const AdminIndex = (): JSX.Element => {
	const auth = useAuth();
	const navigate = useNavigate();
	const { data, isLoading, refetch } = useGetAdminPostsQuery({
		page: 1,
		pageSize: 20,
	});
	const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
	const [deletePost] = useDeletePostMutation();

	if (!auth?.user) {
		navigate('/admin/login');
	}

	const handleNewPost = async () => {
		const payload: PostPayload = {
			title: 'New Post',
			summary: '',
			content: '',
			createdAt: new Date().toISOString(),
			version: 1,
			bannerSrc: '',
			contributorUid: auth?.user?.uid || '',
			status: 'DRAFT',
		};
		try {
			const newPost = await createPost(payload).unwrap();
			navigate(`/admin/posts/${newPost.uid}?version=${newPost.version}`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditPost = (uid: string) => {
		navigate(`/admin/posts/${uid}`);
	};

	const handleDeletePost = async (uid: string) => {
		try {
			await deletePost(uid);
			await refetch();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className={styles.title_row}>
				<h1 className={styles.title}>Manage Posts</h1>
				<div
					role="button"
					className={styles.button_container}
					onClick={handleNewPost}
				>
					<div>New Post</div>
				</div>
			</div>
			<div className={styles.edit_container}>
				{isLoading ? (
					<div>Loading...</div>
				) : isCreating ? (
					<div>Creating...</div>
				) : (
					data?.map((post: PostResult) => (
						<div key={post.uid} className={styles.post_container}>
							<div className={styles.post_fields}>
								<div className={styles.post_title}>{post.title}</div>
								<div className={styles.post_date}>{post.createdAt}</div>
							</div>
							<div className={styles.post_actions}>
								<div
									role="button"
									className={styles.action_button}
									onClick={() => handleEditPost(post.uid)}
								>
									Edit
								</div>
								<div
									role="button"
									className={styles.action_button}
									onClick={() => handleDeletePost(post.uid)}
								>
									Delete
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};
