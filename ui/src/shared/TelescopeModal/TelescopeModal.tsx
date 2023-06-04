/* eslint-disable @typescript-eslint/unbound-method */
import { useEffect } from 'react';
import styles from './TelescopeModal.module.scss';
import { useNavigate } from 'react-router-dom';

type TelescopeModalProps = {
	children?: React.ReactNode;
};

export const TelescopeModal = (props: TelescopeModalProps): JSX.Element => {
	const navigate = useNavigate();

	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				navigate('/');
			}
		});

		return () => document.removeEventListener('keydown', () => {});
	});

	return (
		<>
			<div className={styles.modal_background} onClick={() => navigate('/')} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modal_header}>
						<h5 className={styles.heading} onClick={() => navigate('/')}>
							<div className={styles.close}>{`[ - ] [Close]`}</div>
						</h5>
					</div>
					<div className={styles.modal_scroll_container}>
						<div className={styles.modal_content}>{props.children}</div>
					</div>
				</div>
			</div>
		</>
	);
};
