import {Plan, Product, Project} from '.';

export type SourceData = {
    period: number;
    version: number;
    project: Project;
    plans: Array<Plan>;
    products: Array<Product>;
};
