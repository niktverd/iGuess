import React from 'react';

import _ from 'lodash';

import {Project} from '../../../business/types';
import {Flex} from '../../../components/Flex/Flex';
import {PeriodCard} from '../../../components/guess/PeriodCard/PeriodCard';
import {ProjectDetailsCard} from '../../../components/guess/ProjectDetailsCard/ProjectDetailsCard';
import {SalariesCard} from '../../../components/guess/SalariesCard/SalariesCard';
import {UnitsCard} from '../../../components/guess/UnitsCard/UnitsCard';
import {OnProjectChangeArgs} from '../../../types/common';

import s from './GuessGeneralForm.module.scss';

type GuessGeneralFormProps = {
    project: Project;
    onChange: (event: OnProjectChangeArgs) => void;
    previewOnly?: boolean;
};

export const GuessGeneralForm = ({project, onChange, previewOnly}: GuessGeneralFormProps) => {
    return (
        <Flex className={s.container}>
            <ProjectDetailsCard onChange={onChange} project={project} previewOnly={previewOnly} />
            <PeriodCard onChange={onChange} project={project} previewOnly={previewOnly} />
            <SalariesCard onChange={onChange} project={project} previewOnly={previewOnly} />
            <UnitsCard onChange={onChange} project={project} previewOnly={previewOnly} />
        </Flex>
    );
};
