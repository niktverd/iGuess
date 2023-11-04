import React, {useCallback, useState} from 'react';

import {Box, Check, Pencil} from '@gravity-ui/icons';
import _ from 'lodash';

import {Product, Project} from '../../../business/types';
import {OnProjectChangeArgs} from '../../../types/common';
import {CardBase} from '../../CardBase/CardBase';
import {Flex} from '../../Flex/Flex';
import {CardField} from '../CardField/CardField';

import styles from './ProductCard.module.scss';

type ProductCardProps = Product & {
    onChange: (event: OnProjectChangeArgs) => void;
    onFinishEdit?: () => void;
    namePrefix: string;
    previewOnly?: boolean;
    project: Project;
};

export const ProductCard = ({
    id,
    name,
    cost = 0,
    profit = 0,
    frequency = 100,
    price = 0,
    staff,
    previewOnly,
    namePrefix,
    project,
    onChange,
    onFinishEdit,
}: ProductCardProps) => {
    const [editable, setEditable] = useState(false);
    const currency = _.get(project, 'projectData.currency') || '';

    const onChangeSpecial = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name: fieldName, value} = event.target;
            onChange(event);
            const newEvent = {...event, target: {...event.target}};
            newEvent.target.name = `${namePrefix}.profit`;
            newEvent.target.value = (fieldName === `${namePrefix}.price`
                ? Number(value) - cost
                : price - Number(value)
            ).toString();

            onChange(newEvent);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cost, price],
    );

    return (
        <CardBase editable={editable}>
            <Flex className={styles['header-container']}>
                <Flex className={styles['icon-container']}>
                    <Box />
                </Flex>
                <div className={styles['input-container']}>
                    <input
                        type="text"
                        value={name}
                        name={`${namePrefix}.name`}
                        className={styles.input}
                        onChange={onChange}
                        disabled={!editable}
                    />
                </div>
                {previewOnly ? null : (
                    <button
                        className={styles['button-container']}
                        onClick={() => {
                            if (editable) {
                                onFinishEdit?.();
                            }
                            setEditable(!editable);
                        }}
                    >
                        {editable ? <Check /> : <Pencil />}
                    </button>
                )}
            </Flex>
            <div>
                <input
                    type="text"
                    value={id}
                    className={styles.input}
                    onChange={onChange}
                    disabled
                    style={{color: 'grey', fontSize: 12}}
                />
            </div>
            <div>
                <CardField
                    name={`${namePrefix}.cost`}
                    label="Cost"
                    value={cost}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={onChangeSpecial}
                    unit={currency}
                />
            </div>
            <div>
                <CardField
                    name={`${namePrefix}.profit`}
                    label="Profit"
                    value={profit}
                    type="number"
                    inputClassName={styles.input}
                    editable={false}
                    unit={currency}
                />
            </div>
            <div>
                <CardField
                    name={`${namePrefix}.price`}
                    label="Price"
                    value={price}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={onChangeSpecial}
                    unit={currency}
                />
            </div>
            <div>
                <CardField
                    name={`${namePrefix}.frequency`}
                    label="Frequency"
                    value={frequency}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={onChange}
                    unit={'%'}
                />
            </div>
            <div>
                <CardField
                    name={`${namePrefix}.staff`}
                    label="Staff"
                    value={staff}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={onChange}
                />
            </div>
        </CardBase>
    );
};
