import React, {useState} from 'react';

import {Check, Clock, Pencil} from '@gravity-ui/icons';
import _ from 'lodash';

import {Project} from '../../../business/types';
import {OnProjectChangeArgs} from '../../../types/common';
import {CardBase} from '../../CardBase/CardBase';
import {Flex} from '../../Flex/Flex';
import {CardField} from '../CardField/CardField';

import styles from './PeriodCard.module.scss';

type PeriodCardProps = {
    onChange: (event: OnProjectChangeArgs) => void;
    previewOnly?: boolean;
    project: Project;
};

export const PeriodCard = (props: PeriodCardProps) => {
    const {previewOnly, onChange, project} = props;
    const [editable, setEditable] = useState(false);
    const periodUnits = _.get(project, 'projectData.periodUnits') || '';

    return (
        <CardBase editable={editable}>
            <Flex className={styles['header-container']}>
                <Flex className={styles['icon-container']}>
                    <Clock />
                </Flex>
                <div className={styles['input-container']}>
                    <input
                        type="text"
                        value={`Period${periodUnits ? `, ${periodUnits}` : ''}`}
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
            </Flex>
            <CardField
                label="Period"
                value={_.get(project, 'sourceData.period')}
                type="number"
                inputClassName={styles.input}
                editable={editable}
                onChange={onChange}
                name={`sourceData.period`}
                min={1}
                max={36}
            />
        </CardBase>
    );
};
