import {Plan, Product, ProjectData} from '.';

export type SourceData = {
    period: number;
    plans: Array<Plan>;
    products: Array<Product>;
};

export type ViewConfig = {
    title?: string;
    description?: string;
    options: Record<string, string[]>;
};

export type Project = {
    sourceData: SourceData;
    projectData: ProjectData;
    viewConfigs: ViewConfig[];
    version: number;
};
