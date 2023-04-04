import { useEffect } from 'react';
import styles from './TelescopeModal.module.scss';
import { ResultList } from '../ResultList';
import { ProjectPreview } from '../ProjectPreview';
import { Searchbar } from '../Searchbar';

export type TelescopeModalProps = {
    close: () => void;
}

export const TelescopeModal = (props: TelescopeModalProps) => {
    const { close } = props;

    useEffect(() => {
            document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                close();
            }
        });
    });
    return (
        <>
            <div className={styles.modal_background} onClick={() => close()} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modal_header}>
                        <h5 className={styles.heading} onClick={() => close()}>
                            {`[ - ] [Close]`}
                        </h5>
                    </div>
                    <div className={styles.modal_content}>
                        <ProjectPreview title={'Project Preview'} />
                        <ResultList title={'Project List'} />
                        <Searchbar title={'Find Projects'} />
                    </div>
                </div>
            </div>
        </>
    );
};