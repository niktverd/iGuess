import React from 'react';

import type {NextPage} from 'next';

import styles from './Page.module.css';

type PageProps = {
    hideNavigation?: boolean;
} & React.PropsWithChildren;

export const Page: NextPage<PageProps> = ({hideNavigation = false, children}: PageProps) => {
    return (
        <div className={styles.container}>
            {!hideNavigation && <div className={styles.navigation}>navigation</div>}
            <div className={styles.content}>{children}</div>
        </div>
    );
};
