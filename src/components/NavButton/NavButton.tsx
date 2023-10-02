import React from 'react';

import styles from './NavButton.module.css';

type NavButtonProps = {
    text: string;
    onClick: () => void;
};

export const NavButton = ({text, onClick}: NavButtonProps) => {
    return (
        <button className={styles.container} onClick={onClick}>
            {text}
        </button>
    );
};
