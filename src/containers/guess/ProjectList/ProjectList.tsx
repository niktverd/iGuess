import React, {useCallback, useEffect, useState} from 'react';

import {Project} from '../../../business/types';
import {AddCard} from '../../../components/guess/AddCard/AddCard';
import {initialProjectData} from '../../../contexts/SourceDataContext';

import styles from './ProjectList.module.css';

type ProjectListProps = {
    previewOnly?: boolean;
};

export const ProjectList = (_props: ProjectListProps) => {
    const [projects, setProjects] = useState<Project[]>([]);

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
            alert('Project has been created');
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <div className={styles.container}>
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
