import React, { useState } from 'react';

import {Check, Pencil, Shapes3} from '@gravity-ui/icons';

import { Plan } from '../../../business/types/plans';
import { useSourceData } from '../../../hooks/useSourceData';
import { CardField } from '../CardField/CardField';
import { CardSelector } from '../CardSelector/CardSelector';

import styles from './PlanCard.module.css';

type PlanCardProps = Plan;

export const PlanCard = (props: PlanCardProps) => {
    const {
        id,
        name,
        cac,
        minimalGrowthCount,
        growthRate,
        churnRate,
        sourceOfUserAqcusition,
        availableProducts,
    } = props
    const [editable, setEditable] = useState(false);
    const { sourceData, setSourceData } = useSourceData();

    const handleNameChange = editable ? (event: React.ChangeEvent<HTMLInputElement>) => {
        const editablePlan = sourceData.plans.find((p) => p.id === id);
        if (!editablePlan) {
            return;
        }

        editablePlan.name = event.target.value;
        setSourceData({...sourceData});
    } : undefined;

    const handleCacChange = editable ? (event: React.ChangeEvent<HTMLInputElement>) => {
        const editablePlan = sourceData.plans.find((p) => p.id === id);
        if (!editablePlan) {
            return;
        }

        editablePlan.cac = Number(event.target.value || 0);
        setSourceData({...sourceData});
    } : undefined;

    const handleMinimalGrowthCountChange = editable ? (event: React.ChangeEvent<HTMLInputElement>) => {
        const editablePlan = sourceData.plans.find((p) => p.id === id);
        if (!editablePlan) {
            return;
        }

        editablePlan.minimalGrowthCount = Number(event.target.value || 0);
        setSourceData({...sourceData});
    } : undefined;

    const handleGrowthRateChange = editable ? (event: React.ChangeEvent<HTMLInputElement>) => {
        const editablePlan = sourceData.plans.find((p) => p.id === id);
        if (!editablePlan) {
            return;
        }

        editablePlan.growthRate = Number(event.target.value || 0);
        setSourceData({...sourceData});
    } : undefined;

    const handleChurnthRateChange = editable ? (event: React.ChangeEvent<HTMLInputElement>) => {
        const editablePlan = sourceData.plans.find((p) => p.id === id);
        if (!editablePlan) {
            return;
        }

        editablePlan.churnRate = Number(event.target.value || 0);
        setSourceData({...sourceData});
    } : undefined;

    const handleSourceOfUserAcqusitionChange = (ids: Array<string>) => {
        const editablePlan = sourceData.plans.find((p) => p.id === id);
        if (!editablePlan) {
            return;
        }

        editablePlan.sourceOfUserAqcusition = ids[0] ?? null;
        setSourceData({...sourceData});
    }

    const handleAvailableProductsChange = (ids: Array<string>) => {
        const editablePlan = sourceData.plans.find((p) => p.id === id);
        if (!editablePlan) {
            return;
        }

        editablePlan.availableProducts = ids;
        setSourceData({...sourceData});
    }

    return (
        <div
            className={styles.container}
        >
            <div className={styles['header-container']}>
                <div className={styles['icon-container']}><Shapes3 /></div>
                <div className={styles['input-container']}>
                    <input
                        type="text"
                        value={name}
                        className={styles.input}
                        onChange={handleNameChange}
                        disabled={!editable}
                    />
                </div>
                <button
                    className={styles['button-container']}
                        onClick={() => setEditable(!editable)}
                >
                    {editable ? <Check /> : <Pencil />}
                </button>
            </div>
            <div>
                 <input
                    type="text"
                    value={id}
                    className={styles.input}
                    onChange={handleNameChange}
                    disabled
                    style={{color: 'grey', fontSize: 12}}
                />
            </div>
            <div>
                <CardField
                    label="Client acqusition cost"
                    value={cac}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleCacChange}
                />
            </div>
            <div>
                <CardField
                    label="Minimal users growth"
                    value={minimalGrowthCount}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleMinimalGrowthCountChange}
                />
            </div>
            <div>
                <CardField
                    label="Growth rate"
                    value={growthRate}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleGrowthRateChange}
                />
            </div>
            <div>
                <CardField
                    label="Churn rate"
                    value={churnRate}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleChurnthRateChange}
                />
            </div>
            <div>
                <CardSelector
                    label="Source of user acqusition"
                    value={sourceOfUserAqcusition ? [sourceOfUserAqcusition] : []}
                    type="single"
                    containerClassName={styles['high-z-index']}
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleSourceOfUserAcqusitionChange}
                    currentCard={props}
                    source='plans'
                />
            </div>
            <div>
                <CardSelector
                    label="Available products"
                    value={availableProducts}
                    type="array"
                    containerClassName={styles['low-z-index']}
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleAvailableProductsChange}
                    currentCard={props}
                    source='products'
                />
            </div>
        </div>
    );
};
