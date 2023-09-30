import React from 'react';

import { AddCard } from '../../../components/guess/AddCard/AddCard';
import { ProductCard } from '../../../components/guess/ProductCard/ProductCard';
import { initialProduct } from '../../../contexts/SourceDataContext';
import { useSourceData } from '../../../hooks/useSourceData';

import styles from './GuessProductList.module.css';

type GuessProductListProps = {};

export const GuessProductList = (_props: GuessProductListProps) => {
    const { sourceData } = useSourceData();

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {sourceData.products.map((product) => (
                    <ProductCard key={product.id} {...product}/>
                ))}
                <AddCard type="products" initialValue={initialProduct}/>
            </div>
        </div>
    );
};
