export type ProductName = string;

export type Product = {
    id: string;
    name: string;
    frequency: number;
    price: number;
    profit: number;
    cost: number;
};

export type Products = Record<string, Product>;
