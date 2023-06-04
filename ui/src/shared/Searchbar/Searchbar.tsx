import { useCallback } from 'react';
import styles from './Searchbar.module.scss';

export type SearchbarProps = {
	title: string;
	handleSearch: (query: string) => void;
};

export const Searchbar = (props: SearchbarProps): JSX.Element => {
	const searchInput = useCallback((node: HTMLInputElement) => {
		if (node) node.focus();
	}, []);

	return (
		<fieldset className={styles.searchbar_container}>
			<legend>{props.title}</legend>
			<input
				ref={searchInput}
				className={styles.searchbar_input}
				onChange={(e) => props.handleSearch(e.target.value)}
			/>
		</fieldset>
	);
};
