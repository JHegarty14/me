/* eslint-disable no-irregular-whitespace */
import { LandingMenu } from './components';
import styles from './Landing.module.scss';
import { Footer } from '../../shared/Footer/Footer';
import { useEffect, useState } from 'react';

type Modes = 'normal' | 'insert' | 'visual';

export const Landing = (): JSX.Element => {
	const [mode, setMode] = useState<Modes>('normal');

	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'Escape':
					setMode('normal');
					break;
				case 'i':
					if (e.ctrlKey) {
						setMode('insert');
					}
					break;
				case 'v':
					if (e.ctrlKey) {
						setMode('visual');
					}
					break;
			}
		});
	}, []);

	return (
		<div className={styles.landing_container}>
			<div className={styles.terminal_header}>
				<div className={styles.button_group}>
					<div className={styles.close_button} />
					<div className={styles.minimize_button} />
					<div className={styles.expand_button} />
				</div>
				<div>nvim</div>
				<div className={styles.terminal_keymap}>⌥⌘1</div>
			</div>
			<div className={styles.ascii_banner_container}>
				<pre className={styles.ascii_banner}>
					{`    
██╗░░██╗██╗░░░  ██╗██╗███╗░░░███╗
██║░░██║██║░░░  ██║╚█║████╗░████║
███████║██║░░░  ██║░╚╝██╔████╔██║
██╔══██║██║██╗  ██║░░░██║╚██╔╝██║
██║░░██║██║╚█║  ██║░░░██║░╚═╝░██║
╚═╝░░╚═╝╚═╝░╚╝  ╚═╝░░░╚═╝░░░░░╚═╝
					`}
				</pre>
				<pre className={styles.ascii_banner}>
					{`
░░░░░██╗░█████╗░░█████╗░██╗░░██╗
░░░░░██║██╔══██╗██╔══██╗██║░██╔╝
░░░░░██║███████║██║░░╚═╝█████═╝░
██╗░░██║██╔══██║██║░░██╗██╔═██╗░
╚█████╔╝██║░░██║╚█████╔╝██║░╚██╗
░╚════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝
					`}
				</pre>
			</div>
			<LandingMenu />
			<Footer mode={mode} />
		</div>
	);
};
