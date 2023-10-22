import {ChangeEvent} from 'react';

import {OnProjectChangeArgs, SelectorArgs} from '../types/common';

export const isEvent = (entry: OnProjectChangeArgs): entry is ChangeEvent<HTMLInputElement> => {
    return 'target' in (entry as ChangeEvent<HTMLInputElement>);
};

export const isSelectorArray = (entry: OnProjectChangeArgs): entry is SelectorArgs => {
    return Array.isArray((entry as SelectorArgs).value);
};

export const isSelectorValue = (entry: OnProjectChangeArgs): entry is SelectorArgs => {
    return typeof (entry as SelectorArgs).value === 'string';
};
