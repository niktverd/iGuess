import {ChangeEvent} from 'react';

import {Plan, Product, ViewConfig} from '../business/types';

export type SelectorArgs = {
    path: string;
    value: string | string[] | Product[] | Plan[] | ViewConfig[] | Record<string, string[]>;
};

export type OnProjectChangeArgs = ChangeEvent<HTMLInputElement> | SelectorArgs;

export type DrawOrder = 'direct' | 'reverse';
