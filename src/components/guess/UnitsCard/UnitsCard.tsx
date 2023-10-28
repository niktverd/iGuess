import React, {useState} from 'react';

import {Check, Gear, Pencil} from '@gravity-ui/icons';
import _ from 'lodash';

import {Project} from '../../../business/types';
import {OnProjectChangeArgs} from '../../../types/common';
import {CardBase} from '../../CardBase/CardBase';
import {CardField} from '../CardField/CardField';

import styles from './UnitsCard.module.css';

type UnitsCardProps = {
    onChange: (event: OnProjectChangeArgs) => void;
    previewOnly?: boolean;
    project: Project;
};

export const UnitsCard = (props: UnitsCardProps) => {
    const {previewOnly, onChange, project} = props;
    const [editable, setEditable] = useState(false);

    return (
        <CardBase editable={editable}>
            <div className={styles['header-container']}>
                <div className={styles['icon-container']}>
                    <Gear />
                </div>
                <div className={styles['input-container']}>
                    <input
                        type="text"
                        value={'Units'}
                        className={styles.input}
                        onChange={onChange}
                        disabled={true}
                        // name={`${namePrefix}.name`}
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
                label="Period"
                value={_.get(project, 'projectData.periodUnits') || ''}
                type="text"
                inputClassName={styles.input}
                editable={editable}
                onChange={onChange}
                name={`projectData.periodUnits`}
            />

            <CardField
                label="Currency"
                value={_.get(project, 'projectData.currency') || ''}
                type="text"
                inputClassName={styles.input}
                editable={editable}
                onChange={onChange}
                name={`projectData.currency`}
            />
        </CardBase>
    );
};
