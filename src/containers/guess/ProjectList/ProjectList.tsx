import React, {useCallback, useEffect, useState} from 'react';

import _ from 'lodash';
import {useRouter} from 'next/router';

import {Project} from '../../../business/types';
import {PopupContainer} from '../../../components/PopupContainer/PopupContainer';
import {AddCard} from '../../../components/guess/AddCard/AddCard';
import {ProjectCard} from '../../../components/guess/ProjectCard/ProjectCard';
import {OnProjectChangeArgs} from '../../../types/common';
import {isEvent} from '../../../utils/typeguards';

import styles from './ProjectList.module.css';

type ProjectListProps = {
    previewOnly?: boolean;
};

export const ProjectList = (_props: ProjectListProps) => {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectId, setProjectId] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        const response = await fetch('/api/projects');
        const json = await response.json();
        if (json.ok) {
            setProjects(json.data);
        }
    }, []);

    const updateProject = useCallback(
        async (prjctId: string) => {
            const prjct = projects.find((prj) => prj.projectData.id === prjctId);
            if (!prjct) {
                return;
            }

            await fetch('/api/configs/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prjct),
            });
            fetchProjects();
        },
        [fetchProjects, projects],
    );

    const addProject = useCallback(async () => {
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        const json = await response.json();
        if (json.ok) {
            setProjectId((json.data as Project)?.projectData.id || null);
            fetchProjects();
        }
    }, [fetchProjects]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const popupHandler = useCallback(() => {
        setProjectId(null);

        router.push(`/protected/guess/${projectId}`);
    }, [projectId, router]);

    const onChange = useCallback(
        (entry: OnProjectChangeArgs) => {
            if (!projects) {
                return;
            }

            if (isEvent(entry)) {
                const {name: path, value} = entry.target;
                setProjects([...(_.set(projects, path, value) as Project[])]);
                return;
            } else {
                const {path, value} = entry;
                setProjects([...(_.set(projects, path, value) as Project[])]);
            }
        },
        [projects],
    );

    return (
        <div className={styles.container}>
            {projectId ? (
                <PopupContainer
                    text="Open project"
                    title="Project was created"
                    subtitle={`Project with ID ${1} was successfully created`}
                    onClick={popupHandler}
                />
            ) : null}
            <div>
                <h1>Projects</h1>
            </div>
            <div className={styles.list}>
                {projects.map((prjct, index) => {
                    const namePrefix = `[${index}].projectData`;
                    return (
                        <ProjectCard
                            {...prjct.projectData}
                            key={prjct.projectData.id}
                            onChange={onChange}
                            namePrefix={namePrefix}
                            updateProject={updateProject}
                        />
                    );
                })}
                <AddCard placeholder="Create new project" onClick={addProject} />
            </div>
        </div>
    );
};
