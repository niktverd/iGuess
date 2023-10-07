import React from 'react';

import styles from './ParameterControls.module.css';

type ParameterControlsProps = {
    paramKey: string;
    text: string;
    axis: number;
    index: number;
    onSelect: (key: string, index?: number) => () => void;
    onSelectAxis?: (key: string, step: number) => () => void;
    selected?: boolean;
};

export const ParameterControls = ({
    axis = 0,
    text,
    paramKey,
    onSelect,
    onSelectAxis,
    selected = false,
    index = 0,
}: ParameterControlsProps) => {
    return (
        <div className={`${styles.container} ${selected ? styles['container-selected'] : ''}`}>
            <button className={styles.button} onClick={onSelect(paramKey, index)}>
                <div className={`${styles.circle} ${selected ? styles['circles-selected'] : ''}`} />
                {text}
            </button>
            {onSelectAxis ? (
                <div className={styles.axis}>
                    <button className={styles['axis-selector']} onClick={onSelectAxis(paramKey, 1)}>
                        +
                    </button>
                    <span className={styles['axis-selector-label']}>{axis}</span>
                    <button
                        className={styles['axis-selector']}
                        onClick={onSelectAxis(paramKey, -1)}
                    >
                        -
                    </button>
                </div>
            ) : null}
        </div>
    );
};
