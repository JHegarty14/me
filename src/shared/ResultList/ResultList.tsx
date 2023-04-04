import styles from './ResultList.module.scss';

export type ResultListProps = {
    title: string;
}

export const ResultList = (props: ResultListProps) => {
    return (
        <fieldset className={styles.list_container}>
            <legend>{props.title}</legend>
        </fieldset>
    );
}