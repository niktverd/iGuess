import {ProductName} from './products';

export type PlanName = string;

export type Plan = {
    id: string;
    name: PlanName;
    cac: number;
    minimalGrowthCount: number;
    growthRate: number;
    churnRate: number;
    sourceOfUserAqcusition: PlanName | null;
    availableProducts: ProductName[];
};
