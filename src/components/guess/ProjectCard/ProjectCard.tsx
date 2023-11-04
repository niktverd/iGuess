import {deepEqual} from 'assert';

import React, {useEffect, useState} from 'react';

import {ArrowUpRightFromSquare, FloppyDisk, FolderTree} from '@gravity-ui/icons';
import {pick} from 'lodash';
import {useRouter} from 'next/router';

import {ProjectData} from '../../../business/types';
import {OnProjectChangeArgs} from '../../../types/common';
import {CardBase} from '../../CardBase/CardBase';
import {CardHeaderContainer} from '../../CardHeaderContainer/CardHeaderContainer';
import {Flex} from '../../Flex/Flex';
import {CardField} from '../CardField/CardField';

import styles from './ProjectCard.module.scss';

type ProjectCardProps = ProjectData & {
    onChange: (event: OnProjectChangeArgs) => void;
    updateProject: (projectId: string) => void;
    namePrefix: string;
};

const getProject = (prjct: ProjectCardProps) => pick(prjct, 'id', 'name', 'description');

export const ProjectCard = (props: ProjectCardProps) => {
    const {id, name, description, onChange, updateProject, namePrefix} = props;
    const [initialProjectData] = useState(getProject(props));
    const [editable, setEditable] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const project = getProject(props);
        try {
            deepEqual(initialProjectData, project);
            setIsDirty(false);
        } catch (error) {
            setIsDirty(true);
        }
    }, [initialProjectData, props]);

    return (
        <CardBase editable={editable}>
            <CardHeaderContainer
                icon={<FolderTree />}
                name={name}
                editable={editable}
                setEditable={setEditable}
                onChange={onChange}
                namePrefix={`${namePrefix}.name`}
            />
            <div>
                <input
                    type="text"
                    value={id}
                    className={styles.input}
                    disabled
                    style={{color: 'grey', fontSize: 12}}
                />
            </div>
            <div>
                {/* eslint-disable-next-line no-nested-ternary */}
                {editable ? (
                    <CardField
                        label="Description"
                        value={description}
                        type="text"
                        inputClassName={styles.input}
                        editable={editable}
                        onChange={onChange}
                        name={`${namePrefix}.description`}
                    />
                ) : description ? (
                    <div className={styles['description-container']}>
                        <h4>Description</h4>
                        <div className={styles.description}>{description}</div>
                    </div>
                ) : null}
            </div>
            <Flex className={styles['actions-container']}>
                <button
                    className={styles['button-container']}
                    onClick={() => updateProject(id)}
                    disabled={!isDirty}
                >
                    <FloppyDisk />
                </button>
                <button
                    className={styles['button-container']}
                    onClick={() => router.push(`/protected/guess/${id}`)}
                >
                    <ArrowUpRightFromSquare />
                </button>
            </Flex>
        </CardBase>
    );
};
