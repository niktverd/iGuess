import {deepEqual} from 'assert';

import React, {useCallback, useEffect, useState} from 'react';

import _ from 'lodash';
import type {NextPage} from 'next';

import {Project} from '../../src/business/types';
import {GuessLayout} from '../../src/containers/GuessLayout/GuessLayout';
import {Page} from '../../src/containers/Page/Page';
import {initialProject} from '../../src/contexts/ProjectsContext';
import useStorage from '../../src/hooks/useStorage';
import {OnProjectChangeArgs} from '../../src/types/common';
import {deepCopy} from '../../src/utils/json';
import {isEvent} from '../../src/utils/typeguards';
import {appVersion} from '../../src/version';

const savedProjectKey = `prjct-${appVersion}`;

const Guess: NextPage = () => {
    const [project, setProject] = useState<Project | null>(initialProject);
    const [savedProject, setSavedProject] = useState<Project | null>(deepCopy(initialProject));
    const {setItem, getItem} = useStorage();
    const [isDirty, setIsDirty] = useState<boolean>(false);

    const getProject = useCallback(async () => {
        try {
            const prjct = JSON.parse(getItem(savedProjectKey, 'local'));

            setProject(prjct);
            setSavedProject(deepCopy(prjct));
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

    useEffect(() => {
        try {
            deepEqual(savedProject, project);
            setIsDirty(false);
        } catch (error) {
            setIsDirty(true);
        }
    }, [project, savedProject]);

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
            process.env.FIREBASE_PRIVATE_KEY: {process.env.FIREBASE_PRIVATE_KEY}
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
