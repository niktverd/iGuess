import React, {useEffect, useState} from 'react';

import {SourceData} from '../../../business/types';
import {AddCard} from '../../../components/guess/AddCard/AddCard';
import {initialProject} from '../../../contexts/SourceDataContext';

import styles from './ProjectList.module.css';

type ProjectListProps = {
    previewOnly?: boolean;
};

export const ProjectList = (_props: ProjectListProps) => {
    const [projects, setProjects] = useState<SourceData[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('/api/projects');
            const json = await response.json();
            if (json.ok) {
                setProjects(json.data);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Projects</h1>
            <div className={styles.list}>
                {projects.map((prjct, index) => (
                    <div key={prjct.project?.id + index}>{prjct.project?.id}</div>
                ))}
                <AddCard type="products" initialValue={initialProject} />
            </div>
        </div>
    );
};
