import { uuid } from 'uuidv4';

import {ProductName} from './product';

export enum PlanName {
    Free = 'free',
    Basic = 'basic',
    Ultra = 'ultra',
    Total = 'total',
}

export type Plan = {
    id: string;
    name: string;
    cac: number;
    minimalGrowthCount: number;
    growthRate: number;
    churnRate: number;
    sourceOfUserAqcusition: string | null;
    availableProducts: string[];
};

export const initialPlan: Plan = {
    id: uuid(),
    name: 'Plan',
    sourceOfUserAqcusition: null,
    cac: 0,
    minimalGrowthCount: 100,
    growthRate: 0,
    churnRate: 0,
    availableProducts: [ProductName.FreeUserGood, ProductName.BasicConsultation],
};

export const plans: Plan[] = [
    {
        ...initialPlan,
    },
];
