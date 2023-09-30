import { Plan, Product } from ".";

export type SourceData = {
    period: number;
    plans: Array<Plan>;
    products: Array<Product>;
};