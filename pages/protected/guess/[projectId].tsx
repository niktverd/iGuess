import {deepEqual} from 'assert';

import React, {useCallback, useEffect, useState} from 'react';

import _ from 'lodash';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';

import {Project} from '../../../src/business/types';
import {GuessLayout} from '../../../src/containers/GuessLayout/GuessLayout';
import {Page} from '../../../src/containers/Page/Page';
import {OnProjectChangeArgs} from '../../../src/types/common';
import {deepCopy} from '../../../src/utils/json';
import {isEvent} from '../../../src/utils/typeguards';

const Guess: NextPage = () => {
    const {
        query: {projectId},
    } = useRouter();

    const [project, setProject] = useState<Project | null>(null);
    const [initialProject, setInitialProject] = useState<Project | null>(null);
    const [isDirty, setIsDirty] = useState<boolean>(false);

    const getProject = useCallback(async () => {
        const response = await fetch(`/api/projects?projectId=${projectId}`);
        const json = await response.json();

        if (json.ok) {
            setProject(json.data);
            setInitialProject(deepCopy(json.data));
        }
    }, [projectId]);

    const saveProject = useCallback(async () => {
        await fetch(`/api/configs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });

        getProject();
    }, [getProject, project]);

    useEffect(() => {
        getProject();
    }, [getProject]);

    useEffect(() => {
        try {
            deepEqual(initialProject, project);
            setIsDirty(false);
        } catch (error) {
            setIsDirty(true);
        }
    }, [initialProject, project]);

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
        <Page>
            {project ? (
                <GuessLayout
                    getProject={getProject}
                    saveProject={saveProject}
                    project={project}
                    onChange={onChange}
                    isDirty={isDirty}
                />
            ) : null}
        </Page>
    );
};

export default Guess;
