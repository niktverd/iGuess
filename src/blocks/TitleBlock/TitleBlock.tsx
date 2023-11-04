import React from 'react';

import {Button} from '../../components/Button/Button';
import {Flex} from '../../components/Flex/Flex';
import {VideoBlock} from '../VideoBlock/VideoBlock';

import s from './TitleBlock.module.scss';

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
        <Flex className={s.container}>
            <Flex direction="column" className={s.content}>
                <h1 className={s.title}>{title}</h1>
                <p className={s.subtitle}>{subtitle}</p>
                <Flex>
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
                </Flex>
            </Flex>
            <Flex className={s.video}>
                <VideoBlock {...rest} title="" subtitle="" endBlur={100} startBlur={0} />
            </Flex>
        </Flex>
    );
};
