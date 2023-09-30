import React from 'react';

import { uuid } from 'uuidv4';

import { Plan } from '../business/plan';
import { Product } from '../business/product';

export type SourceData = {
    period: number;
    plans: Array<Plan>;
    products: Array<Product>;
};

export const initialProduct: Product = {
    id: uuid(),
    name: 'Product 1',
    profit: 0,
    cost: 0,
    price: 0,
    frequency: 1,
};

export const initialSourceData: SourceData = {
    period: 36,
    plans: [{
        id: uuid(),
        name: 'Plan',
        cac: 1,
        minimalGrowthCount: 1,
        growthRate: 1,
        churnRate: 1,
        sourceOfUserAqcusition: null,
        availableProducts: [],
    }],
    products: [
        {
           ...initialProduct
        },
        {
            ...initialProduct,
            id: uuid(),
            name: 'Product 2',
        },
    ],
};

export type SourceDataContextProps = {
    sourceData: SourceData;
    setSourceData: React.Dispatch<React.SetStateAction<SourceData>>;
};

export const SourceDataContext = React.createContext<SourceDataContextProps>({
    sourceData: initialSourceData,
    setSourceData: () => null,
});
