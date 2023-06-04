import { useParams } from 'react-router-dom';
import { useGetPostByUidQuery } from '../../../api/public.api';
import { BannerImage, Navigation } from '../../../shared';
import MarkdownEditor from '@uiw/react-markdown-editor';

import styles from './PostDetail.module.scss';

export const PostDetail = (): JSX.Element => {
	const { postUid } = useParams();

	if (!postUid) {
		throw new Error('404- Post not found');
	}

	const { data, isLoading } = useGetPostByUidQuery(postUid);

	return (
		<div className={styles.detail_container}>
			{!isLoading ? (
				<>
					<Navigation />
					<BannerImage src={data?.bannerSrc} alt={'thumbnail'} />
					<div className={styles.post_title}>
						<h1>{data?.title}</h1>
						<p>
							{data?.updatedAt
								? `Updated: ${new Date(data?.updatedAt).toDateString()}`
								: new Date(data?.createdAt ?? 0).toDateString()}
						</p>
					</div>
					<div className={styles.post_contributor}>
						{data?.contributor.name}
					</div>
					<div className={styles.post_content}>
						<MarkdownEditor.Markdown
							source={data?.content ?? ''}
							className={styles.markdown_previewer}
						/>
					</div>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
