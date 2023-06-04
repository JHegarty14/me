/* eslint-disable @typescript-eslint/no-misused-promises */
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useEffect, useState } from 'react';

import styles from './ManagePost.module.scss';
import { useAuth } from '../../../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { PostStatus } from '../../../types';
import {
	useGetVersionedPostQuery,
	useUpdatePostMutation,
} from '../../../api/admin.api';

export const ManagePost = (): JSX.Element => {
	const auth = useAuth();
	const navigate = useNavigate();
	const { postUid, version } = useParams();
	const { data, isLoading } = useGetVersionedPostQuery({
		uid: postUid ?? '',
		version: version ? parseInt(version) : 1,
	});
	const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
	const [bannerSrc, setBannerSrc] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [summary, setSummary] = useState<string>('');

	if (!auth.user) {
		navigate('/admin/login');
	}

	useEffect(() => {
		if (data) {
			setBannerSrc(data.bannerSrc);
			setTitle(data.title);
			setContent(data.content);
			setSummary(data.summary);
		}
	}, [data]);

	const handleSave = async (status: PostStatus) => {
		const payload = {
			uid: postUid as string,
			bannerSrc,
			title,
			content,
			status,
			summary,
		};
		try {
			await updatePost(payload).unwrap();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.manage_post_container}>
			<div className={styles.title_row}>
				<h2>Edit Post</h2>
				<div className={styles.btn_container}>
					<div
						className={styles.btn}
						onClick={() => navigate('/admin')}
						role="button"
					>
						Back
					</div>
					<div
						className={styles.btn}
						onClick={() => handleSave('DRAFT')}
						role="button"
					>
						Save
					</div>
					<div
						className={styles.btn}
						onClick={() => handleSave('PUBLISHED')}
						role="button"
					>
						Publish
					</div>
				</div>
			</div>
			{isLoading || isUpdating ? (
				<div>Loading...</div>
			) : (
				<div className={styles.edit_container}>
					<div className={styles.banner_src_container}>
						<label className={styles.input_label} htmlFor="fbanner">
							Banner
						</label>
						<input
							type="text"
							placeholder="Link to source image"
							value={bannerSrc}
							onChange={(e) => setBannerSrc(e.target.value)}
							id={'fbanner'}
							name={'fbanner'}
							className={styles.input}
						/>
					</div>
					<div className={styles.title_input_container}>
						<label className={styles.input_label} htmlFor="ftitle">
							Title
						</label>
						<input
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							id={'ftitle'}
							name={'ftitle'}
							className={styles.input}
						/>
					</div>
					<div className={styles.summary_input_container}>
						<label className={styles.input_label} htmlFor="ftitle">
							Summary
						</label>
						<textarea
							placeholder=""
							value={summary}
							onChange={(e) => setSummary(e.target.value)}
							id={'fsummary'}
							name={'fsummary'}
							className={styles.input}
						/>
					</div>
					<MarkdownEditor
						onChange={setContent}
						value={content}
						className={styles.markdown_editor}
					/>
				</div>
			)}
		</div>
	);
};
