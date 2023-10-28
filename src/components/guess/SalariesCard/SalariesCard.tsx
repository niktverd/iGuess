import React, {useState} from 'react';

import {Check, FileDollar, Pencil} from '@gravity-ui/icons';
import _ from 'lodash';

import {Project} from '../../../business/types';
import {OnProjectChangeArgs} from '../../../types/common';
import {CardBase} from '../../CardBase/CardBase';
import {CardField} from '../CardField/CardField';

import styles from './SalariesCard.module.css';

type SalariesCardProps = {
    onChange: (event: OnProjectChangeArgs) => void;
    previewOnly?: boolean;
    project: Project;
};

export const SalariesCard = (props: SalariesCardProps) => {
    const {previewOnly, onChange, project} = props;
    const [editable, setEditable] = useState(false);
    const currency = _.get(project, 'projectData.currency') || '';

    return (
        <CardBase editable={editable}>
            <div className={styles['header-container']}>
                <div className={styles['icon-container']}>
                    <FileDollar />
                </div>
                <div className={styles['input-container']}>
                    <input
                        type="text"
                        value={`Salary${currency ? `, ${currency}` : ''}`}
                        className={styles.input}
                        onChange={onChange}
                        disabled={true}
                    />
                </div>
                {previewOnly ? null : (
                    <button
                        className={styles['button-container']}
                        onClick={() => setEditable(!editable)}
                    >
                        {editable ? <Check /> : <Pencil />}
                    </button>
                )}
            </div>
            <CardField
                label="Executors"
                value={_.get(project, 'projectData.executorsSalary') || 1000}
                type="number"
                inputClassName={styles.input}
                editable={editable}
                onChange={onChange}
                name={`projectData.executorsSalary`}
            />

            <CardField
                label="Managers"
                value={_.get(project, 'projectData.managersSalary') || 2000}
                type="number"
                inputClassName={styles.input}
                editable={editable}
                onChange={onChange}
                name={`projectData.managersSalary`}
            />
        </CardBase>
    );
};
