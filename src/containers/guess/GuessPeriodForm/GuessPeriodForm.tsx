import React from 'react';

import {useSourceData} from '../../../hooks/useSourceData';

import styles from './GuessPeriodForm.module.css';

type GuessPeriodFormProps = {};

export const GuessPeriodForm = (_props: GuessPeriodFormProps) => {
    const {sourceData, setSourceData} = useSourceData();

    return (
        <div className={styles.container}>
            <div>
                <span>Period:</span>
                <input
                    type="number"
                    min={1}
                    max={36}
                    value={sourceData.period}
                    onChange={(e) => setSourceData({...sourceData, period: Number(e.target.value)})}
                />
            </div>
        </div>
    );
};
