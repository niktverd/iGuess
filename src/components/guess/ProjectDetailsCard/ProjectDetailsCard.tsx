import React, {useState} from 'react';

import {Check, FolderTree, Pencil} from '@gravity-ui/icons';
import _ from 'lodash';

import {Project} from '../../../business/types';
import {OnProjectChangeArgs} from '../../../types/common';
import {CardBase} from '../../CardBase/CardBase';
import {CardField} from '../CardField/CardField';

import styles from './ProjectDetailsCard.module.css';

type ProjectDetailsCardProps = {
    onChange: (event: OnProjectChangeArgs) => void;
    previewOnly?: boolean;
    project: Project;
};

export const ProjectDetailsCard = (props: ProjectDetailsCardProps) => {
    const {previewOnly, onChange, project} = props;
    const [editable, setEditable] = useState(false);

    return (
        <CardBase>
            <div className={styles['header-container']}>
                <div className={styles['icon-container']}>
                    <FolderTree />
                </div>
                <div className={styles['input-container']}>
                    <input
                        type="text"
                        value={'Project Details'}
                        className={styles.input}
                        onChange={onChange}
                        disabled={true}
                        // name={`${namePrefix}.name`}
                    />
                </div>
                {previewOnly ? null : (
                    <button
                        className={styles['button-container']}
                        onClick={() => setEditable(!editable)}
                    >
                        {editable ? <Check /> : <Pencil />}
                    </button>
                )}
            </div>
            <div>
                <input
                    type="text"
                    value={_.get(project, 'projectData.id')}
                    className={styles.input}
                    onChange={onChange}
                    disabled
                    style={{color: 'grey', fontSize: 12}}
                />
            </div>
            <CardField
                label="Name"
                value={_.get(project, 'projectData.name')}
                type="text"
                inputClassName={styles.input}
                editable={editable}
                onChange={onChange}
                name={`projectData.name`}
            />

            <CardField
                label="Description"
                value={_.get(project, 'projectData.description')}
                type="text"
                inputClassName={styles.input}
                editable={editable}
                onChange={onChange}
                name={`projectData.description`}
            />
        </CardBase>
    );
};
