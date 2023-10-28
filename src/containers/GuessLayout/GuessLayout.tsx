import React, {useEffect, useState} from 'react';

import {CirclePlusFill} from '@gravity-ui/icons';
import {signOut} from 'next-auth/react';

import {GetReportResponse, getReport} from '../../business/report';
import {Project} from '../../business/types';
import {NavButton} from '../../components/NavButton/NavButton';
import {Chart} from '../../components/guess/Chart/Chart';
import {OnProjectChangeArgs} from '../../types/common';
import {deepCopy} from '../../utils/json';
import {GuessGeneralForm} from '../guess/GuessGeneralForm/GuessGeneralForm';
import {GuessPlanList} from '../guess/GuessPlanList/GuessPlanList';
import {GuessProductList} from '../guess/GuessProductList/GuessProductList';

import styles from './GuessLayout.module.css';

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
        setData(getReport(sourceData));
    }, [section, sourceData]);

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
        <div className={styles.container}>
            <div className={styles['main-navigation']}>
                <NavButton text="Overview" onClick={() => setSection(Section.Overview)} />
                <NavButton text="General" onClick={() => setSection(Section.General)} />
                <NavButton text="Products" onClick={() => setSection(Section.Products)} />
                <NavButton text="Plans" onClick={() => setSection(Section.Plans)} />
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
                <NavButton text="Sign Out" onClick={() => signOut()} />
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
        </div>
    );
};
