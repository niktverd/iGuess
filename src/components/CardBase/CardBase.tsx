import React, {PropsWithChildren} from 'react';

import styles from './CardBase.module.css';

export const CardBase = ({
    children
}: PropsWithChildren) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};
