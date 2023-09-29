import React from 'react';

import type {NextPage} from 'next';

import styles from './Field.module.css';

type FieldProps = {
    label: string;
    field: string | JSX.Element;
};

export const Field: NextPage<FieldProps> = ({label, field}: FieldProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <div className={styles.field}>{field}</div>
        </div>
    );
};
