/* eslint-disable import/named */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './IconButton.module.scss';

export type IconButtonProps = {
	icon: IconDefinition;
	text: string;
	keyMap: string;
	onClick?: (...args: unknown[]) => unknown;
	buttonClass?: string;
};

export const IconButton = (props: IconButtonProps): JSX.Element => {
	const { buttonClass, icon, keyMap, onClick, text } = props;
	return (
		<div>
			<div
				className={`${styles.icon_button} ${buttonClass ? buttonClass : ''}`}
				onClick={onClick}
				role={'button'}
			>
				<FontAwesomeIcon icon={icon} className={styles.button_icon} />
				<div className={styles.button_text}>{text}</div>
				<div className={styles.button_keymap}>{keyMap}</div>
			</div>
		</div>
	);
};
