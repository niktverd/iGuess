import React from 'react';

import {Product} from '../../../business/types';
import {AddCard} from '../../../components/guess/AddCard/AddCard';
import {ProductCard} from '../../../components/guess/ProductCard/ProductCard';
import {initialProduct} from '../../../contexts/SourceDataContext';
import {OnProjectChangeArgs} from '../../../types/common';

import styles from './GuessProductList.module.css';

type GuessProductListProps = {
    products: Product[];
    onChange: (event: OnProjectChangeArgs) => void;
    previewOnly?: boolean;
};

export const GuessProductList = ({products, onChange, previewOnly}: GuessProductListProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {products.map((product, index) => {
                    const namePrefix = `sourceData.products[${index}]`;
                    return (
                        <ProductCard
                            key={product.id}
                            {...product}
                            previewOnly={previewOnly}
                            namePrefix={namePrefix}
                            onChange={onChange}
                        />
                    );
                })}
                {previewOnly ? null : <AddCard type="products" initialValue={initialProduct} />}
            </div>
        </div>
    );
};
