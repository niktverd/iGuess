import {Report} from './report';
import { SourceData } from './types';
import {PlanName} from './types/plans';
import {wrapper} from './utils';

type UpdateEarningsArgs = {
    source: SourceData;
    report: Report;
    month: number;
};

export const updateProductSales = ({report, source}: UpdateEarningsArgs) => {
    wrapper(report, (key: PlanName) => {
        const plan = source.plans.find((p) => p.id === key);
        if (!plan) {
            return;
        }
        
        /* eslint-disable no-param-reassign */
        // report[key].profitByProduct = initializeParameterByProduct(0);
        // report[key].salesCountByProduct = initializeParameterByProduct(0);
        // report[key].revenueByProduct = initializeParameterByProduct(0);
        /* eslint-enable no-param-reassign */

        let profit = 0;
        let salesCount = 0;
        let revenue = 0;
        let cost = 0;
        for (const productName of plan.availableProducts) {
            const product = source.products.find((p) => p.id === productName);
            if (!product) {
                continue;
            }
            const salesCountByProduct = Math.ceil(product.frequency * report.byPlan[key].users);
            const profitByProduct = product.profit * salesCountByProduct;
            const costByProduct = product.cost * salesCountByProduct;
            const revenueByProduct = (product.cost + product.profit) * salesCountByProduct;
            /* eslint-disable no-param-reassign */
            // report[key].profitByProduct[productName] = profitByProduct;
            // report[key].salesCountByProduct[productName] = salesCountByProduct;
            // report[key].revenueByProduct[productName] = revenueByProduct;
            /* eslint-enable no-param-reassign */
            profit += profitByProduct;
            salesCount += salesCountByProduct;
            revenue += revenueByProduct;
            cost += costByProduct;
        }

        /* eslint-disable no-param-reassign */
        report.byPlan[key].salesCount = salesCount;
        report.byPlan[key].profit = profit;
        report.byPlan[key].revenue = revenue;
        report.byPlan[key].cost = cost;
        /* eslint-enable no-param-reassign */

    });
};
