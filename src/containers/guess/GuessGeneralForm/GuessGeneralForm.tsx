import React from 'react';

import {initialProject} from '../../../contexts/SourceDataContext';
import {useSourceData} from '../../../hooks/useSourceData';

import styles from './GuessGeneralForm.module.css';

type GuessGeneralFormProps = {
    previewOnly?: boolean;
};

export const GuessGeneralForm = (_props: GuessGeneralFormProps) => {
    const {sourceData, setSourceData} = useSourceData();
    const project = sourceData.project || initialProject;
    return (
        <div className={styles.container}>
            <div>
                <span>Period:</span>
                <input
                    type="number"
                    min={1}
                    max={36}
                    value={sourceData.period}
                    onChange={(e) => setSourceData({...sourceData, period: Number(e.target.value)})}
                />
            </div>
            <div>
                Project
                <div>
                    <span>projectId:</span>
                    <input
                        type="text"
                        value={project.id}
                        onChange={(e) =>
                            setSourceData({
                                ...sourceData,
                                project: {...project, id: e.target.value},
                            })
                        }
                    />
                </div>
                <div>
                    <span>projectName:</span>
                    <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                            setSourceData({
                                ...sourceData,
                                project: {...project, name: e.target.value},
                            })
                        }
                    />
                </div>
                <div>
                    <span>projectDescription:</span>
                    <input
                        type="text"
                        value={project.description}
                        onChange={(e) =>
                            setSourceData({
                                ...sourceData,
                                project: {...project, description: e.target.value},
                            })
                        }
                    />
                </div>
            </div>
        </div>
    );
};
