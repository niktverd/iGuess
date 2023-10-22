import {ChangeEvent} from 'react';

export type SelectorArgs = {
    path: string;
    value: string | string[];
};

export type OnProjectChangeArgs = ChangeEvent<HTMLInputElement> | SelectorArgs;
