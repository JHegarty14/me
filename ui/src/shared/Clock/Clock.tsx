import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from '../../shared/Footer/Footer.module.scss';

export const Clock = (): JSX.Element => {
	const [date, setDate] = useState(new Date());

	const refreshClock = () => {
		setDate(new Date());
	};

	useEffect(() => {
		const timerId = setInterval(refreshClock, 1000);
		return function cleanup() {
			clearInterval(timerId);
		};
	}, []);

	return (
		<div className={styles.time}>
			<FontAwesomeIcon icon={icon({ name: 'clock' })} />
			&nbsp;{' '}
			{date.toLocaleTimeString(undefined, { hour12: false, second: undefined })}
		</div>
	);
};
