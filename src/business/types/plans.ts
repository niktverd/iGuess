export type PlanName = string;

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
