import {Plan, Product, ProjectData} from '.';

export type SourceData = {
    period: number;
    plans: Array<Plan>;
    products: Array<Product>;
};

export type ViewConfig = {};

export type Project = {
    sourceData: SourceData;
    projectData: ProjectData;
    viewConfig: ViewConfig;
    version: number;
};
