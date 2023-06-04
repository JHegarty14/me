/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router-dom';
import { useGetPostsQuery } from '../../api/public.api';
import { PostResult } from '../../types';
import { PostPreview } from './components';

import styles from './WritingResults.module.scss';
import { Navigation } from '../../shared';

export const WritingResults = (): JSX.Element => {
	const navigate = useNavigate();
	const { data, isLoading } = useGetPostsQuery({ page: 1, pageSize: 10 });

	const handleDetail = (postUid: string) => {
		navigate(`/writing/${postUid}`);
	};

	return (
		<div className={styles.writing_results_container}>
			<Navigation />
			<h1 className={styles.writing_results_title}>
				Welcome to the Word Vomit
			</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				data?.map((post: PostResult) => (
					<div
						key={post.uid}
						className={styles.result_list_container}
						onClick={() => handleDetail(post.uid)}
						role={'button'}
					>
						<PostPreview
							title={post.title}
							contributor={post.contributor.name}
							createdAt={post.createdAt}
							summary={post.summary}
							thumbnailSrc={post.contributor.thumbnailSrc}
						/>
					</div>
				))
			)}
		</div>
	);
};
