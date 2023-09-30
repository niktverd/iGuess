import {PlanName, plans} from './plan';
import {Report, initializeParameterByProduct} from './report';
import {wrapper} from './utils';

export enum ProductName {
    FreeUserGood = 'free-user-good',
    FreeConsultation = 'free-consultation',

    BasicSubscription = 'basic-subscription',
    BasicUserGood = 'basic-user-good',
    BasicConsultation = 'basic-consultation',

    UltraSubscription = 'ultra-subscription',
    UltraUserGood = 'ultra-user-good',
    UltraConsultation = 'ultra-consultation',
}

export type Product = {
    id: string;
    name: string;
    frequency: number;
    price: number;
    profit: number;
    cost: number;
};

export type Products = Record<string, Product>;

type UpdateEarningsArgs = {
    report: Report;
    month: number;
};

export const updateProductSales = ({report}: UpdateEarningsArgs) => {
    wrapper(report, (key: PlanName) => {
        const plan = plans.find((p) => p.name === key);
        if (!plan || !plan.availableProducts) {
            return;
        }
        
        /* eslint-disable no-param-reassign */
        report[key].profitByProduct = initializeParameterByProduct(0);
        report[key].salesCountByProduct = initializeParameterByProduct(0);
        report[key].revenueByProduct = initializeParameterByProduct(0);
        /* eslint-enable no-param-reassign */

        let profit = 0;
        let salesCount = 0;
        let revenue = 0;
        for (const productName of plan.availableProducts) {
            const product = products[productName];
            const salesCountByProduct = Math.ceil(product.frequency * report[key].users);
            const profitByProduct = product.profit * salesCountByProduct;
            const revenueByProduct = (product.cost + product.profit) * salesCountByProduct;
            /* eslint-disable no-param-reassign */
            report[key].profitByProduct[productName] = profitByProduct;
            report[key].salesCountByProduct[productName] = salesCountByProduct;
            report[key].revenueByProduct[productName] = revenueByProduct;
            /* eslint-enable no-param-reassign */
            profit += profitByProduct;
            salesCount += salesCountByProduct;
            revenue += revenueByProduct;
        }

        /* eslint-disable no-param-reassign */
        report[key].salesCount = salesCount;
        report[key].profit = profit;
        report[key].revenue = revenue;
        /* eslint-enable no-param-reassign */

    });
};
