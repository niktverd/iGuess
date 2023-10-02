// import {calculateTeam} from './capex';
import {updateProductSales} from './product';
// import {summary} from './summary';
// import {calculateTotal} from './total';
import { 
    ProductName,
    // ProductName, 
    SourceData } from './types';
// import { ProductName } from './types';
import {PlanName} from './types/plans';
import {calculateCosts, correctUsers, updateUsers} from './user';
import {flattenObject} from './utils';

export type ProductReport = {
    profit: number;
    revenue: number;
    cost: number;
    salesCount: number;
    balance: number;
}

export type PlanReport = ProductReport & {
    users: number;
    usersDiff: number;
    marketingCosts: number;
    
    // salesCountByProduct: Record<ProductName, number>;
    // profitByProduct: Record<ProductName, number>;
    // revenueByProduct: Record<ProductName, number>;
};

export type TeamReport = Record<string, number>;

export type Report = {
    byPlan: Record<PlanName, PlanReport>;
    byProduct: Record<ProductName, ProductReport>;
    team: Record<string, number>;
    total: Record<string, number>;
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


export const initialProductReport: ProductReport = {
    profit: 0,
    cost: 0,
    revenue: 0,
    salesCount: 0,
    balance: 0,
    // salesCountByProduct: initializeParameterByProduct(0),
    // profitByProduct: initializeParameterByProduct(0),
    // revenueByProduct: initializeParameterByProduct(0),
};

export const initialPlanReport: PlanReport = {
    ...initialProductReport,
    users: 0,
    usersDiff: 0,
    marketingCosts: 0,
};

export const getInitialReport = (source: SourceData): Report => {
    const plans = source.plans.map((p) => p.id);
    const byPlan = plans.reduce((acc, planId) => {
        // eslint-disable-next-line no-param-reassign
        acc[planId] = {...initialPlanReport};

        return acc;
    }, {} as Record<string, PlanReport>);

    const products = source.products.map((p) => p.id);
    const byProduct = products.reduce((acc, productId) => {
        // eslint-disable-next-line no-param-reassign
        acc[productId] = {...initialProductReport};

        return acc;
    }, {} as Record<string, ProductReport>);

    console.log('byPlan', byPlan);

    return {
        byPlan,
        byProduct,
        team: {},
        total: {
            ...initialPlanReport,
        },
    };
};

export type GetReportResponse = {
    month: number;
    report: Report;
    flat: Record<string, string | number>;
}

export const getReport = (source: SourceData): GetReportResponse[] => {
    const report = getInitialReport(source);
    console.log('reportreport', JSON.stringify(report.byPlan, null, 3));
    const periods = [];
    for (let month = 0; month < source.period; month++) {
        updateUsers({report, month, source});
        correctUsers({report, month, source});
        calculateCosts({report, month, source});
        updateProductSales({report, month, source});
        // calculateTotal({report, source});
        // calculateTeam({report, source});
        // summary({report, source});
        periods.push(JSON.parse(JSON.stringify({month, report, flat: flattenObject(report)})));
    }

    return periods;
};
