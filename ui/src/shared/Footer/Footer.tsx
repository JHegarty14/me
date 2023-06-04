import { Mode } from './Mode';

import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Clock } from '../Clock';

export type FooterProps = {
	mode: 'normal' | 'insert' | 'visual';
};

export const Footer = (props: FooterProps): JSX.Element => {
	return (
		<div className={styles.footer_container}>
			<Mode mode={props.mode} />
			<div className={styles.branch}>
				<FontAwesomeIcon icon={icon({ name: 'code-branch', style: 'solid' })} />
				&nbsp; main
			</div>
			<div className={styles.file}>init.lua</div>
			<div className={styles.plugins}>
				<FontAwesomeIcon icon={icon({ name: 'gear' })} />
				&nbsp; lua_ls, copilot &nbsp; &nbsp;
			</div>
			<div className={styles.session}>
				<div className={styles.packages}>
					<FontAwesomeIcon icon={icon({ name: 'box' })} />
					&nbsp; 47
				</div>
			</div>
			<Clock />
		</div>
	);
};
