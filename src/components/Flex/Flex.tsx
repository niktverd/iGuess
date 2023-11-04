import React, {DetailedHTMLProps, HTMLAttributes, useMemo} from 'react';

import type {NextPage} from 'next';

import s from './Flex.module.scss';

type FlexProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    direction?: 'row' | 'column';
};

export const Flex: NextPage<FlexProps> = ({
    direction = 'row',
    children,
    className = undefined,
    ...props
}: FlexProps) => {
    const classes = useMemo(() => {
        return [className, s.display, direction === 'column' ? s.column : s.row]
            .filter(Boolean)
            .join(' ');
    }, [className, direction]);

    return (
        <div {...props} className={classes}>
            {children}
        </div>
    );
};
