import styles from './BannerImage.module.scss';

type BannerImageProps = {
	src?: string;
	alt?: string;
	className?: string;
};

export const BannerImage = (props: BannerImageProps): JSX.Element => {
	const { src, alt, className } = props;
	return src ? (
		<img
			src={src}
			alt={alt}
			className={`${styles.banner_image} ${className ?? ''}`}
		/>
	) : (
		<></>
	);
};
