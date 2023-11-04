import React, {useEffect, useState} from 'react';

import {CirclePlusFill} from '@gravity-ui/icons';

import {GetReportResponse, getReport} from '../../business/report';
import {Project} from '../../business/types';
import {Flex} from '../../components/Flex/Flex';
import {NavButton} from '../../components/NavButton/NavButton';
import {Chart} from '../../components/guess/Chart/Chart';
import {OnProjectChangeArgs} from '../../types/common';
import {deepCopy} from '../../utils/json';
import {GuessGeneralForm} from '../guess/GuessGeneralForm/GuessGeneralForm';
import {GuessPlanList} from '../guess/GuessPlanList/GuessPlanList';
import {GuessProductList} from '../guess/GuessProductList/GuessProductList';

import styles from './GuessLayout.module.scss';

type GuessLayoutProps = {
    project: Project;
    onChange: (event: OnProjectChangeArgs) => void;
    isDirty?: boolean;
    previewOnly?: boolean;
    getProject?: () => void;
    saveProject?: () => void;
};

enum Section {
    Overview = 'overview',
    General = 'general',
    Plans = 'plans',
    Products = 'products',
}

export const GuessLayout = ({
    project,
    onChange,
    previewOnly,
    isDirty = false,
    saveProject,
}: GuessLayoutProps) => {
    const {sourceData, viewConfigs} = project;
    const [data, setData] = useState<GetReportResponse[] | null>(null);
    const [section, setSection] = useState<Section>(Section.Overview);

    useEffect(() => {
        if (section !== Section.Overview) {
            return;
        }

        // eslint-disable-next-line no-console
        setData(getReport(sourceData, project));
    }, [project, section, sourceData]);

    const handleAddChart = () => {
        onChange({
            path: `viewConfigs`,
            value: [
                ...viewConfigs,
                {title: `Chart#${viewConfigs.length}`, description: '-', options: {}},
            ],
        });
    };

    const handleDeleteChart = (index: number) => () => {
        const newConfig = deepCopy(viewConfigs);
        newConfig.splice(index, 1);
        onChange({
            path: `viewConfigs`,
            value: newConfig,
        });
    };

    return (
        <Flex className={styles.container}>
            <div className={styles['main-navigation']}>
                <NavButton
                    text="Overview"
                    onClick={() => setSection(Section.Overview)}
                    selected={section === Section.Overview}
                />
                <NavButton
                    text="General"
                    onClick={() => setSection(Section.General)}
                    selected={section === Section.General}
                />
                <NavButton
                    text="Products"
                    onClick={() => setSection(Section.Products)}
                    selected={section === Section.Products}
                />
                <NavButton
                    text="Plans"
                    onClick={() => setSection(Section.Plans)}
                    selected={section === Section.Plans}
                />
                <hr />
                {previewOnly ? null : (
                    <React.Fragment>
                        <NavButton
                            text={isDirty ? 'Save' : 'Saved'}
                            onClick={saveProject}
                            disabled={!isDirty}
                        />
                        <hr />
                    </React.Fragment>
                )}
            </div>
            <div className={styles['section']}>
                {section === Section.Overview && data ? (
                    <div>
                        {viewConfigs.map((_viewConfig, index) => {
                            return (
                                <Chart
                                    onChange={onChange}
                                    namePrefix={`viewConfigs[${index}]`}
                                    key={index}
                                    reportData={data}
                                    project={project}
                                    handleDeleteChart={handleDeleteChart(index)}
                                    previewOnly={previewOnly}
                                />
                            );
                        })}
                        {previewOnly ? null : (
                            <button
                                className={styles['charts-add-button']}
                                onClick={handleAddChart}
                            >
                                <CirclePlusFill width={32} height={32} />
                            </button>
                        )}
                    </div>
                ) : null}
                {section === Section.General ? (
                    <GuessGeneralForm
                        previewOnly={previewOnly}
                        project={project}
                        onChange={onChange}
                    />
                ) : null}
                {section === Section.Products ? (
                    <GuessProductList
                        previewOnly={previewOnly}
                        products={project.sourceData.products}
                        onChange={onChange}
                        project={project}
                    />
                ) : null}
                {section === Section.Plans ? (
                    <GuessPlanList
                        project={project}
                        previewOnly={previewOnly}
                        plans={project.sourceData.plans}
                        onChange={onChange}
                    />
                ) : null}
            </div>
        </Flex>
    );
};
