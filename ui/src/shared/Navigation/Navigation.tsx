import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';
import styles from './Navigation.module.scss';

export const Navigation = (): JSX.Element => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	const handleHome = () => {
		navigate('/');
	};

	return (
		<div className={styles.back_btn_row}>
			<div onClick={handleBack} role="button" className={styles.back_btn}>
				<FontAwesomeIcon icon={icon({ name: 'arrow-left' })} />
				&nbsp;Back
			</div>
			<div onClick={handleHome} role="button" className={styles.back_btn}>
				<FontAwesomeIcon icon={icon({ name: 'home' })} />
				&nbsp;Home
			</div>
		</div>
	);
};
