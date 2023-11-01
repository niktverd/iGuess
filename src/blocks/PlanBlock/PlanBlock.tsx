import React, {useCallback, useEffect, useState} from 'react';

import _ from 'lodash';

import {Project} from '../../business/types';
import {PlanCard} from '../../components/guess/PlanCard/PlanCard';
import {initialProject} from '../../contexts/ProjectsContext';
import useStorage from '../../hooks/useStorage';
import {OnProjectChangeArgs} from '../../types/common';
import {isEvent} from '../../utils/typeguards';
import {appVersion} from '../../version';
import {VideoBlock} from '../VideoBlock/VideoBlock';

import s from './PlanBlock.module.css';

type PlanBlockProps = {
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

export const PlanBlock = ({
    title,
    subtitle,
    // mainButton,
    // secondaryButton,
    ...rest
}: PlanBlockProps) => {
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

    const plan = project?.sourceData.plans[0];

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
        <div className={s.container}>
            <div className={s.video}>
                <VideoBlock {...rest} title="" subtitle="" endBlur={100} startBlur={0} />
            </div>
            <div className={s.content}>
                <h1 className={s.title}>{title}</h1>
                <p className={s.subtitle}>{subtitle}</p>
            </div>
            <div className={s['try-zone']}>
                <div>Try it right here</div>
                {plan ? (
                    <PlanCard
                        {...plan}
                        project={project}
                        namePrefix="sourceData.plans.0"
                        onChange={onChange}
                        onFinishEdit={saveProject}
                    />
                ) : null}
            </div>
        </div>
    );
};
