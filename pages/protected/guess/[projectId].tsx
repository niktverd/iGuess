import React, {useCallback, useEffect, useState} from 'react';

import _ from 'lodash';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';

import {Project} from '../../../src/business/types';
import {GuessLayout} from '../../../src/containers/GuessLayout/GuessLayout';
import {Page} from '../../../src/containers/Page/Page';
import {OnProjectChangeArgs} from '../../../src/types/common';
import {isEvent} from '../../../src/utils/typeguards';

const Guess: NextPage = () => {
    const {
        query: {projectId},
    } = useRouter();

    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const getProject = async () => {
            const response = await fetch(`/api/projects?projectId=${projectId}`);
            const json = await response.json();

            if (json.ok) {
                setProject(json.data);
            }
        };
        getProject();
    }, [projectId]);

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

    return <Page>{project ? <GuessLayout project={project} onChange={onChange} /> : null}</Page>;
};

export default Guess;
