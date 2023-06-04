import { useEffect } from 'react';
import { ListItem, ProjectKey } from '../../types';
import styles from './ResultList.module.scss';

export type ResultListProps = {
	title: string;
	onSelect: (id: ProjectKey) => void;
	items: ListItem[];
	selected: string;
	handleArrowNavigation: (dir: -1 | 1) => void;
};

export const ResultList = (props: ResultListProps): JSX.Element => {
	const { title, items, selected, onSelect, handleArrowNavigation } = props;

	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowUp') {
				handleArrowNavigation(1);
			}
			if (e.key === 'ArrowDown') {
				handleArrowNavigation(-1);
			}
		});

		return () => document.removeEventListener('keydown', () => {});
	});

	return (
		<fieldset className={styles.list_container}>
			<legend>{title}</legend>
			<div className={styles.list_wrapper}>
				{items.map((item) => (
					<div
						key={item.id}
						className={`${styles.item} ${
							selected === item.id ? styles.selected : ''
						}`}
						onClick={() => onSelect(item.id)}
					>
						{item.text}
					</div>
				))}
			</div>
		</fieldset>
	);
};
