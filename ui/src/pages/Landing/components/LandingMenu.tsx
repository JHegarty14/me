/* eslint-disable @typescript-eslint/unbound-method */
import styles from './LandingMenu.module.scss';
import { IconButton, IconButtonProps } from '../../../shared';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingMenu = (): JSX.Element => {
	const navigate = useNavigate();

	const keyListener = (e: KeyboardEvent) => {
		if (e.ctrlKey) {
			switch (e.key) {
				case 'a':
					navigate('/about');
					break;
				case 'p':
					navigate('/projects');
					break;
				case 'w':
					navigate('/writing');
					break;
				case 'g':
					window.open('https://github.com/jhegarty14', '_blank');
					break;
				case 'l':
					window.open('https://www.linkedin.com/in/jack-m-hegarty', '_blank');
					break;
				default:
					break;
			}
		}
	};

	useEffect(() => {
		window.addEventListener('keyup', keyListener);
	}, []);

	const menuItems: IconButtonProps[] = [
		{
			icon: icon({ name: 'sitemap' }),
			text: 'About',
			keyMap: '<C + a>',
			onClick: () => navigate('/about'),
		},
		{
			icon: icon({ name: 'gear' }),
			text: 'Projects',
			keyMap: '<C + p>',
			onClick: () => navigate('/projects'),
		},
		{
			icon: icon({ name: 'pen' }),
			text: 'Writing',
			keyMap: '<C + w>',
			onClick: () => navigate('/writing'),
		},
		{
			icon: icon({ name: 'github', style: 'brands' }),
			text: 'Github',
			keyMap: '<C + g>',
			onClick: () => window.open('https://github.com/jhegarty14', '_blank'),
		},
		{
			icon: icon({ name: 'linkedin', style: 'brands' }),
			text: 'LinkedIn',
			keyMap: '<C + l>',
			onClick: () =>
				window.open('https://www.linkedin.com/in/jack-m-hegarty', '_blank'),
		},
	];

	return (
		<>
			<div className={styles.landing_menu}>
				{menuItems.map((item) => (
					<IconButton {...item} key={item.keyMap} />
				))}
			</div>
		</>
	);
};
