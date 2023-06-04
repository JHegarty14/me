import styles from './PostPreview.module.scss';

type ContributorProps = {
	name: string;
	thumbnailSrc: string;
};

export const Contributor = (props: ContributorProps): JSX.Element => {
	return (
		<div className={styles.contributor_container}>
			<img
				src={props.thumbnailSrc}
				alt={props.name}
				className={styles.contributor_img}
			/>
			<p>{props.name}</p>
		</div>
	);
};
