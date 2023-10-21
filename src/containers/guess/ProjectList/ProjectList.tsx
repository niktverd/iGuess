import React, {useCallback, useEffect, useState} from 'react';

import {useRouter} from 'next/router';

import {Project} from '../../../business/types';
import {PopupContainer} from '../../../components/PopupContainer/PopupContainer';
import {AddCard} from '../../../components/guess/AddCard/AddCard';
import {initialProjectData} from '../../../contexts/SourceDataContext';

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
                <button onClick={fetchProjects}>update</button>
            </div>
            <div className={styles.list}>
                {projects.map((prjct, index) => (
                    <div key={prjct.projectData?.id + index}>{prjct.projectData?.id}</div>
                ))}
                <AddCard
                    type="products"
                    initialValue={initialProjectData}
                    placeholder="Create new project"
                    onClick={addProject}
                />
            </div>
        </div>
    );
};
