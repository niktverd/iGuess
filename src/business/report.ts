// import {calculateTeam} from './capex';
import {updateProductSales} from './product';
// import {summary} from './summary';
// import {calculateTotal} from './total';
import { 
    // ProductName, 
    SourceData } from './types';
// import { ProductName } from './types';
import {PlanName} from './types/plans';
import {calculateCosts, correctUsers, updateUsers} from './user';
import {flattenObject} from './utils';

export type PlanReport = {
    users: number;
    usersDiff: number;
    profit: number;
    revenue: number;
    marketingCosts: number;
    salesCount: number;
    balance: number;
    // salesCountByProduct: Record<ProductName, number>;
    // profitByProduct: Record<ProductName, number>;
    // revenueByProduct: Record<ProductName, number>;
};

export type TeamReport = Record<string, number>;

export type Report = Record<PlanName, PlanReport> & {
    total: Omit<PlanReport, 'salesCountByProduct' | 'profitByProduct' | 'revenueByProduct'>;
    // team: TeamReport;
};

// export const initializeParameterByProduct: (initialValue: number) => Record<ProductName, number> = (
//     initialValue = 0,
// ) => {
//     const values = Object.values(ProductName);

//     return values.reduce((acc, value) => {
//         // eslint-disable-next-line no-param-reassign
//         acc[value] = initialValue;
//         return acc;
//     }, {} as Record<ProductName, number>);
// };

export const initialPlanReport: PlanReport = {
    users: 0,
    usersDiff: 0,
    profit: 0,
    revenue: 0,
    salesCount: 0,
    marketingCosts: 0,
    balance: 0,
    // salesCountByProduct: initializeParameterByProduct(0),
    // profitByProduct: initializeParameterByProduct(0),
    // revenueByProduct: initializeParameterByProduct(0),
};

export const getInitialReport = (source: SourceData): Report => {
    const values = source.plans.map((p) => p.id);

    const initReport: Report = values.reduce((acc, value) => {
        // eslint-disable-next-line no-param-reassign
        acc[value] = {...initialPlanReport};

        return acc;
    }, {} as Report);

    return {
        ...initReport,
        total: {
            ...initialPlanReport,
        },
    };
};

export const getReport = (source: SourceData): Record<string, number>[] => {
    const report = getInitialReport(source);
    const periods = [];
    for (let month = 0; month < source.period; month++) {
        updateUsers({report, month, source});
        correctUsers({report, month, source});
        calculateCosts({report, month, source});
        updateProductSales({report, month, source});
        // calculateTotal({report, source});
        // calculateTeam({report, source});
        // summary({report, source});
        periods.push({month, ...flattenObject(report)});
    }

    return periods;
};
