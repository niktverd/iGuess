import React from 'react';

import {CirclePlus} from '@gravity-ui/icons';

import styles from './AddCard.module.css';

type AddCardProps = {
    placeholder?: string;
    onClick?: () => void;
};

export const AddCard = ({placeholder, onClick}: AddCardProps) => {
    return (
        <div className={styles.container}>
            <button className={styles['button-container']} onClick={onClick}>
                <CirclePlus width={54} height={54} />
            </button>
            {placeholder ? <div className={styles.placeholder}>{placeholder}</div> : null}
        </div>
    );
};
