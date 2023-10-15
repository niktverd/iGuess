import React, {useState} from 'react';

import {Box, Check, Pencil} from '@gravity-ui/icons';

import {Product} from '../../../business/types';
import {useSourceData} from '../../../hooks/useSourceData';
import {CardField} from '../CardField/CardField';

import styles from './ProductCard.module.css';

type ProductCardProps = Product & {
    previewOnly?: boolean;
};

export const ProductCard = ({
    id,
    name,
    cost,
    profit,
    frequency,
    price,
    staff,
    previewOnly,
}: ProductCardProps) => {
    const [editable, setEditable] = useState(false);
    const {sourceData, setSourceData} = useSourceData();

    const handleChange = (field: keyof Product) =>
        !previewOnly && editable
            ? (event: React.ChangeEvent<HTMLInputElement>) => {
                  const editableProduct = sourceData.products.find((p) => p.id === id);
                  if (!editableProduct) {
                      return;
                  }

                  editableProduct[field] = Number(event.target.value);
                  setSourceData({...sourceData});
              }
            : undefined;

    return (
        <div className={styles.container}>
            <div className={styles['header-container']}>
                <div className={styles['icon-container']}>
                    <Box />
                </div>
                <div className={styles['input-container']}>
                    <input
                        type="text"
                        value={name}
                        className={styles.input}
                        onChange={handleChange('name')}
                        disabled={!editable}
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
            <div>
                <input
                    type="text"
                    value={id}
                    className={styles.input}
                    onChange={handleChange('id')}
                    disabled
                    style={{color: 'grey', fontSize: 12}}
                />
            </div>
            <div>
                <CardField
                    label="Cost"
                    value={cost}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleChange('cost')}
                />
            </div>
            <div>
                <CardField
                    label="Profit"
                    value={profit}
                    type="number"
                    inputClassName={styles.input}
                    editable={false}
                    // onChange={handleProfitChange}
                />
            </div>
            <div>
                <CardField
                    label="Price"
                    value={price}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleChange('price')}
                />
            </div>
            <div>
                <CardField
                    label="Frequency"
                    value={frequency}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleChange('frequency')}
                />
            </div>
            <div>
                <CardField
                    label="Staff"
                    value={staff}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleChange('staff')}
                />
            </div>
        </div>
    );
};
