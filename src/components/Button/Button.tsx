import React from 'react';

import Link from 'next/link';

import s from './Button.module.scss';

type ButtonProps = {
    text: string;
    selected?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    view: 'primary' | 'secondary';
    url: string;
};

export const Button = ({
    text,
    onClick,
    url,
    disabled = false,
    selected = false,
    view = 'secondary',
}: ButtonProps) => {
    return (
        <Link href={url}>
            <button
                className={`${s.container} ${selected ? s.selected : ''} ${s[view]}`}
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
        </Link>
    );
};
