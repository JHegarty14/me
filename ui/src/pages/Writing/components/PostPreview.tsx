import styles from './PostPreview.module.scss';

type PostPreviewProps = {
	title: string;
	contributor: string;
	createdAt: string;
	summary: string;
	thumbnailSrc: string;
};

export const PostPreview = (props: PostPreviewProps): JSX.Element => {
	const { title, createdAt, summary } = props;

	return (
		<div className={styles.post_preview_container}>
			{/*
				<Contributor name={contributor} thumbnailSrc={thumbnailSrc} /> 
				// disabling unless other contributors are added. It looks
				// narcissistic with only my face on the page lol
			*/}
			<div className={styles.post_preview}>
				<div className={styles.title_row}>
					<h2>{title}</h2>
					<p>{new Date(createdAt).toDateString()}</p>
				</div>
				<p className={styles.post_preview_summary}>{summary}</p>
			</div>
		</div>
	);
};
