import React from 'react';

import {Button} from '../../components/Button/Button';
import {VideoBlock} from '../VideoBlock/VideoBlock';

import s from './TitleBlock.module.css';

type TitleBlockProps = {
    title: string;
    subtitle: string;
    startBlur?: number;
    endBlur?: number;
    mainButton?: {
        text: string;
        url: string;
    };
    secondaryButton?: {
        text: string;
        url: string;
    };
    // text: string;
    // onClick: () => void;
};

export const TitleBlock = ({
    title,
    subtitle,
    mainButton,
    secondaryButton,
    ...rest
}: TitleBlockProps) => {
    return (
        <div className={s.container}>
            <div className={s.content}>
                <h1 className={s.title}>{title}</h1>
                <p className={s.subtitle}>{subtitle}</p>
                <div className={s.actions}>
                    {mainButton ? (
                        <Button url={mainButton.url} view="primary" text={mainButton.text} />
                    ) : null}
                    {secondaryButton ? (
                        <Button
                            url={secondaryButton.url}
                            view="secondary"
                            text={secondaryButton.text}
                        />
                    ) : null}
                </div>
            </div>
            <div className={s.video}>
                <VideoBlock {...rest} title="" subtitle="" endBlur={100} startBlur={0} />
            </div>
        </div>
    );
};
