import React from 'react';

import styles from './ParameterControls.module.css';

type ParameterControlsProps = {
    paramKey: string;
    text: string;
    axis: number;
    onSelect: (key: string) => () => void;
    onSelectAxis: (key: string, step: number) => () => void;
};

export const ParameterControls = ({
    axis = 0,
    text,
    paramKey,
    onSelect,
    onSelectAxis,
}: ParameterControlsProps) => {
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={onSelect(paramKey)}>
                {text}
            </button>
            <div className={styles.axis}>
                <button onClick={onSelectAxis(paramKey, 1)}>+</button>
                {axis}
                <button onClick={onSelectAxis(paramKey, -1)}>-</button>
            </div>
        </div>
    );
};
