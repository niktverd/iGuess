import React from 'react';

import {AddCard} from '../../../components/guess/AddCard/AddCard';
import {PlanCard} from '../../../components/guess/PlanCard/PlanCard';
import {initialPlan} from '../../../contexts/SourceDataContext';
import {useSourceData} from '../../../hooks/useSourceData';

import styles from './GuessPlanList.module.css';

type GuessPlanListProps = {};

export const GuessPlanList = (_props: GuessPlanListProps) => {
    const {sourceData} = useSourceData();

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {sourceData.plans.map((plan) => (
                    <PlanCard key={plan.id} {...plan} />
                ))}
                <AddCard type="plans" initialValue={initialPlan} />
            </div>
        </div>
    );
};
