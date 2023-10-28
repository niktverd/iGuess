import React from 'react';

import _ from 'lodash';

import {Project} from '../../../business/types';
import {PeriodCard} from '../../../components/guess/PeriodCard/PeriodCard';
import {ProjectDetailsCard} from '../../../components/guess/ProjectDetailsCard/ProjectDetailsCard';
import {SalariesCard} from '../../../components/guess/SalariesCard/SalariesCard';
import {UnitsCard} from '../../../components/guess/UnitsCard/UnitsCard';
import {OnProjectChangeArgs} from '../../../types/common';

import styles from './GuessGeneralForm.module.css';

type GuessGeneralFormProps = {
    project: Project;
    onChange: (event: OnProjectChangeArgs) => void;
    previewOnly?: boolean;
};

export const GuessGeneralForm = ({project, onChange, previewOnly}: GuessGeneralFormProps) => {
    return (
        <div className={styles.container}>
            <PeriodCard onChange={onChange} project={project} previewOnly={previewOnly} />
            <ProjectDetailsCard onChange={onChange} project={project} previewOnly={previewOnly} />
            <SalariesCard onChange={onChange} project={project} previewOnly={previewOnly} />
            <UnitsCard onChange={onChange} project={project} previewOnly={previewOnly} />
        </div>
    );
};
