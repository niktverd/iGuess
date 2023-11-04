import React, {useState} from 'react';

import {FolderTree} from '@gravity-ui/icons';
import _ from 'lodash';

import {Project} from '../../../business/types';
import {OnProjectChangeArgs} from '../../../types/common';
import {CardBase} from '../../CardBase/CardBase';
import {CardHeaderContainer} from '../../CardHeaderContainer/CardHeaderContainer';
import {CardField} from '../CardField/CardField';

import s from './ProjectDetailsCard.module.scss';

type ProjectDetailsCardProps = {
    onChange: (event: OnProjectChangeArgs) => void;
    previewOnly?: boolean;
    project: Project;
};

export const ProjectDetailsCard = (props: ProjectDetailsCardProps) => {
    const {onChange, project} = props;
    const [editable, setEditable] = useState(false);

    return (
        <CardBase editable={editable}>
            <CardHeaderContainer
                icon={<FolderTree />}
                name="Project Details"
                disabled={true}
                editable={editable}
                setEditable={setEditable}
            />
            <div>
                <input
                    type="text"
                    value={_.get(project, 'projectData.id')}
                    className={s.input}
                    onChange={onChange}
                    disabled
                    style={{color: 'grey', fontSize: 12}}
                />
            </div>
            <CardField
                label="Name"
                value={_.get(project, 'projectData.name')}
                type="text"
                inputClassName={s.input}
                editable={editable}
                onChange={onChange}
                name={`projectData.name`}
            />

            <CardField
                label="Description"
                value={_.get(project, 'projectData.description')}
                type="text"
                inputClassName={s.input}
                editable={editable}
                onChange={onChange}
                name={`projectData.description`}
            />
        </CardBase>
    );
};
