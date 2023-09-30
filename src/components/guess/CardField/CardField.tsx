import React from 'react'

import s from './CardField.module.css';

type CardFieldProps = {
    value: string | number;
    type: string;
    label?: string;
    inputContainerClassName?: string;
    inputClassName?: string;
    editable?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CardField = ({
    label = '',
    value,
    onChange,
    inputClassName,
    editable,
    type = 'text',
    inputContainerClassName
}: CardFieldProps) => {
    return (
        <div className={`${s.container} ${inputContainerClassName}`}>
            <label className={s.label}>
                <div className={s['label-text']}>{label}</div>
                <div>{type}</div>
            </label>
            <input
                type={type}
                value={value}
                className={`${s.input} ${inputClassName}`}
                onChange={onChange}
                disabled={!editable}
            />
        </div>
    )
}
