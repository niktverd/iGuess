import React, {useCallback, useEffect, useState} from 'react';

import _ from 'lodash';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';

import {Project} from '../../../../src/business/types';
import {GuessLayout} from '../../../../src/containers/GuessLayout/GuessLayout';
import {Page} from '../../../../src/containers/Page/Page';
import {OnProjectChangeArgs} from '../../../../src/types/common';

const Guess: NextPage = () => {
    const {
        query: {projectId, userId},
    } = useRouter();

    const [project, setProject] = useState<Project | null>(null);

    const getProject = useCallback(async () => {
        const response = await fetch(`/api/preview?projectId=${projectId}&userId=${userId}`);
        const json = await response.json();

        if (json.ok) {
            setProject(json.data);
        }
    }, [projectId, userId]);

    const saveProject = useCallback(async () => {
        
    }, []);

    useEffect(() => {
        getProject();
    }, [getProject]);

    const onChange = useCallback(
        (_entry: OnProjectChangeArgs) => {},
        [],
    );

    return (
        <Page>
            {project ? (
                <GuessLayout
                    getProject={getProject}
                    saveProject={saveProject}
                    project={project}
                    onChange={onChange}
                    isDirty={false}
                    previewOnly
                />
            ) : null}
        </Page>
    );
};

export default Guess;
