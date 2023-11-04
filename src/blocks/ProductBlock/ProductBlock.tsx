import React, {useCallback, useEffect, useState} from 'react';

import _ from 'lodash';

import {Project} from '../../business/types';
import {Flex} from '../../components/Flex/Flex';
import {ProductCard} from '../../components/guess/ProductCard/ProductCard';
import {initialProject} from '../../contexts/ProjectsContext';
import useStorage from '../../hooks/useStorage';
import {OnProjectChangeArgs} from '../../types/common';
import {isEvent} from '../../utils/typeguards';
import {appVersion} from '../../version';
import {VideoBlock} from '../VideoBlock/VideoBlock';

import s from './ProductBlock.module.scss';

type ProductBlockProps = {
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

const savedProjectKey = `prjct-${appVersion}`;

export const ProductBlock = ({
    title,
    subtitle,
    // mainButton,
    // secondaryButton,
    ...rest
}: ProductBlockProps) => {
    const [project, setProject] = useState<Project | null>(initialProject);
    const {setItem, getItem} = useStorage();

    const getProject = useCallback(async () => {
        try {
            const prjct = JSON.parse(getItem(savedProjectKey, 'local'));

            setProject(prjct || initialProject);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveProject = useCallback(async () => {
        setItem(savedProjectKey, JSON.stringify(project), 'local');
        getProject();
    }, [getProject, project, setItem]);

    useEffect(() => {
        getProject();
    }, [getProject]);

    const product = project?.sourceData.products[0];

    const onChange = useCallback(
        (entry: OnProjectChangeArgs) => {
            if (!project) {
                return;
            }

            if (isEvent(entry)) {
                const {name: path, value} = entry.target;
                setProject({...(_.set(project, path, value) as Project)});
                return;
            } else {
                const {path, value} = entry;
                setProject({...(_.set(project, path, value) as Project)});
            }
        },
        [project],
    );

    return (
        <Flex className={s.container}>
            <Flex direction="column" className={s['try-zone']}>
                <div>Try it right here</div>
                {product ? (
                    <ProductCard
                        {...product}
                        project={project}
                        namePrefix="sourceData.products.0"
                        onChange={onChange}
                        onFinishEdit={saveProject}
                    />
                ) : null}
            </Flex>
            <Flex direction="column" className={s.content}>
                <h2 className={s.title}>{title}</h2>
                <p className={s.subtitle}>{subtitle}</p>
            </Flex>
            <div className={s.video}>
                <VideoBlock {...rest} title="" subtitle="" endBlur={100} startBlur={0} />
            </div>
        </Flex>
    );
};
