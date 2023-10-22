import React from 'react';

import styles from './NavButton.module.css';

type NavButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
};

export const NavButton = ({text, onClick, disabled = false}: NavButtonProps) => {
    return (
        <button className={styles.container} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};
