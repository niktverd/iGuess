import {ChangeEvent} from 'react';

import {Plan, Product} from '../business/types';

export type SelectorArgs = {
    path: string;
    value: string | string[] | Product[] | Plan[];
};

export type OnProjectChangeArgs = ChangeEvent<HTMLInputElement> | SelectorArgs;
