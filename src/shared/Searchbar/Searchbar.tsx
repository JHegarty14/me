import styles from './Searchbar.module.scss';

export type SearchbarProps = {
    title: string;
}

export const Searchbar = (props: SearchbarProps) => {
    return (
        <fieldset className={styles.searchbar_container}>
            <legend>{props.title}</legend>
            <input className={styles.searchbar_input} />
        </fieldset>
    );
}