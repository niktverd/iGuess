import React, {useEffect, useState} from 'react';

import type {NextPage} from 'next';
import {useRouter} from 'next/router';

import {Project} from '../../../src/business/types';
import {GuessLayout} from '../../../src/containers/GuessLayout/GuessLayout';
import {Page} from '../../../src/containers/Page/Page';

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

    return <Page>{project ? <GuessLayout project={project} /> : null}</Page>;
};

export default Guess;
