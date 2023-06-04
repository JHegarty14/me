import styles from './ProjectPreview.module.scss';
import { ProjectType } from '../../types';
import septImg from '../../assets/img/sept_sample.png';
import quicksyncImg from '../../assets/img/quicksync_sample.png';
import dotfilesImg from '../../assets/img/dotfiles_sample.png';

export type ProjectPreviewProps = {
	title: string;
	project?: ProjectType;
};

export const ProjectPreview = (props: ProjectPreviewProps): JSX.Element => {
	const { title, project } = props;

	const imgMap: Record<'septImg' | 'quicksyncImg' | 'dotfilesImg', string> = {
		septImg,
		quicksyncImg,
		dotfilesImg,
	};

	return (
		<fieldset className={styles.preview_container}>
			<legend>{title}</legend>
			<div className={styles.preview_wrapper}>
				<div className={styles.image}>
					{project && (
						<img
							className={styles.img_wrap}
							src={imgMap[project.img]}
							alt={project.link}
						/>
					)}
				</div>
				<div className={styles.preview_sidebar}>
					{project && (
						<>
							<div className={styles.preview_description}>
								{project.description}
							</div>
							<div>
								<a className={styles.preview_link} href={project.link}>
									{project.link}
								</a>
							</div>
						</>
					)}
				</div>
			</div>
		</fieldset>
	);
};
