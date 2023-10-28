import React from 'react';

import {uuid} from 'uuidv4';

import {Plan, Product, ProjectData, SourceData} from '../business/types';

export const initialProduct: Product = {
    id: uuid(),
    name: 'Product 1',
    profit: 0,
    cost: 0,
    price: 0,
    frequency: 100,
    staff: 1,
};

export const initialPlan: Plan = {
    id: uuid(),
    name: 'Plan',
    cac: 1,
    minimalGrowthCount: 100,
    growthRate: 10,
    churnRate: 0,
    sourceOfUserAqcusition: null,
    availableProducts: [],
};

export const initialProjectData: ProjectData = {
    id: uuid(),
    name: '',
    description: '',
    executorsSalary: 1000,
    managersSalary: 2000,
    currency: '',
    periodUnits: '',
};

export const initialSourceData: SourceData = {
    period: 36,
    plans: [{...initialPlan}],
    products: [
        {
            ...initialProduct,
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
