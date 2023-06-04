import styles from './Mode.module.scss';

type ModeProps = {
	mode: 'normal' | 'insert' | 'visual';
};

export const Mode = (props: ModeProps): JSX.Element => {
	const { mode } = props;
	return (
		<div className={`${styles.mode} ${styles[mode]}`}>
			<div>{mode.toUpperCase()}</div>
		</div>
	);
};
