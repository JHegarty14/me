import styles from './ProjectPreview.module.scss';

export type ProjectPreviewProps = {
    title: string;
}

export const ProjectPreview = (props: ProjectPreviewProps) => {
    return (
        <fieldset className={styles.preview_container}>
            <legend>{props.title}</legend>
        </fieldset>
    );
}