import React, {useCallback} from 'react';

import {uuid} from 'uuidv4';

import {Plan} from '../../../business/types';
import {AddCard} from '../../../components/guess/AddCard/AddCard';
import {PlanCard} from '../../../components/guess/PlanCard/PlanCard';
import {initialPlan} from '../../../contexts/SourceDataContext';
import {OnProjectChangeArgs} from '../../../types/common';

import styles from './GuessPlanList.module.css';

type GuessPlanListProps = {
    plans: Plan[];
    onChange: (event: OnProjectChangeArgs) => void;
    previewOnly?: boolean;
};

export const GuessPlanList = ({plans, onChange, previewOnly}: GuessPlanListProps) => {
    const addPlan = useCallback(() => {
        onChange({
            path: 'sourceData.plans',
            value: [...plans, {...initialPlan, id: uuid()}],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plans]);

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {plans.map((plan, index) => {
                    const namePrefix = `sourceData.plans[${index}]`;
                    return (
                        <PlanCard
                            key={plan.id}
                            {...plan}
                            previewOnly={previewOnly}
                            namePrefix={namePrefix}
                            onChange={onChange}
                        />
                    );
                })}
                {previewOnly ? null : <AddCard onClick={addPlan} placeholder="Add new plan" />}
            </div>
        </div>
    );
};
