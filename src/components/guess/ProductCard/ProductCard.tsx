import React, {useState} from 'react';

import {Box, Check, Pencil} from '@gravity-ui/icons';

import {Product} from '../../../business/types';
import {useSourceData} from '../../../hooks/useSourceData';
import {CardField} from '../CardField/CardField';

import styles from './ProductCard.module.css';

type ProductCardProps = Product;

export const ProductCard = ({id, name, cost, profit, frequency, price}: ProductCardProps) => {
    const [editable, setEditable] = useState(false);
    const {sourceData, setSourceData} = useSourceData();

    const handleNameChange = editable
        ? (event: React.ChangeEvent<HTMLInputElement>) => {
              const editableProduct = sourceData.products.find((p) => p.id === id);
              if (!editableProduct) {
                  return;
              }

              editableProduct.name = event.target.value;
              setSourceData({...sourceData});
          }
        : undefined;

    const handleCostChange = editable
        ? (event: React.ChangeEvent<HTMLInputElement>) => {
              const editableProduct = sourceData.products.find((p) => p.id === id);
              if (!editableProduct) {
                  return;
              }

              editableProduct.cost = Number(event.target.value || 0);
              editableProduct.price = editableProduct.cost + editableProduct.profit;
              setSourceData({...sourceData});
          }
        : undefined;

    const handleProfitChange = editable
        ? (event: React.ChangeEvent<HTMLInputElement>) => {
              const editableProduct = sourceData.products.find((p) => p.id === id);
              if (!editableProduct) {
                  return;
              }

              editableProduct.profit = Number(event.target.value || 0);
              editableProduct.price = editableProduct.cost + editableProduct.profit;
              setSourceData({...sourceData});
          }
        : undefined;

    const handleFrequencyChange = editable
        ? (event: React.ChangeEvent<HTMLInputElement>) => {
              const editableProduct = sourceData.products.find((p) => p.id === id);
              if (!editableProduct) {
                  return;
              }

              editableProduct.frequency = Number(event.target.value || 0);
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
                    label="Cost"
                    value={cost}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleCostChange}
                />
            </div>
            <div>
                <CardField
                    label="Profit"
                    value={profit}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleProfitChange}
                />
            </div>
            <div>
                <CardField
                    label="Price"
                    value={price}
                    type="number"
                    inputClassName={styles.input}
                    editable={false}
                />
            </div>
            <div>
                <CardField
                    label="Frequency"
                    value={frequency}
                    type="number"
                    inputClassName={styles.input}
                    editable={editable}
                    onChange={handleFrequencyChange}
                />
            </div>
        </div>
    );
};
