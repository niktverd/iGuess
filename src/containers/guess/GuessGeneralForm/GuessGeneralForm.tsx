import React from 'react';

import _ from 'lodash';

import {Project} from '../../../business/types';
import {OnProjectChangeArgs} from '../../../types/common';

import styles from './GuessGeneralForm.module.css';

type GuessGeneralFormProps = {
    project: Project;
    onChange: (event: OnProjectChangeArgs) => void;
    previewOnly?: boolean;
};

export const GuessGeneralForm = ({project, onChange}: GuessGeneralFormProps) => {
    return (
        <div className={styles.container}>
            <div>
                <span>Period:</span>
                <input
                    type="number"
                    min={1}
                    max={36}
                    value={_.get(project, 'sourceData.period')}
                    name="sourceData.period"
                    onChange={onChange}
                />
            </div>
            <div>
                Project
                <div>
                    <span>projectId:</span>
                    <input
                        type="text"
                        value={_.get(project, 'projectData.id')}
                        name="projectData.id"
                        onChange={onChange}
                        disabled
                    />
                </div>
                <div>
                    <span>projectName:</span>
                    <input
                        type="text"
                        value={_.get(project, 'projectData.name')}
                        name="projectData.name"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <span>projectDescription:</span>
                    <input
                        type="text"
                        value={_.get(project, 'projectData.description')}
                        name="projectData.description"
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
};
