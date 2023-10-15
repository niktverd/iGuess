import React, {useCallback, useEffect, useState} from 'react';

import {CirclePlusFill} from '@gravity-ui/icons';
import {memoize} from 'lodash';

import {GetReportResponse, getReport} from '../../business/report';
import {NavButton} from '../../components/NavButton/NavButton';
import {Chart} from '../../components/guess/Chart/Chart';
import {useSourceData} from '../../hooks/useSourceData';
import useStorage from '../../hooks/useStorage';
import {GuessPeriodForm} from '../guess/GuessPeriodForm/GuessPeriodForm';
import {GuessPlanList} from '../guess/GuessPlanList/GuessPlanList';
import {GuessProductList} from '../guess/GuessProductList/GuessProductList';

import styles from './GuessLayout.module.css';

type GuessLayoutProps = {
    previewOnly?: boolean;
};

enum Section {
    Overview = 'overview',
    Period = 'period',
    Plans = 'plans',
    Products = 'products',
}

type ViewConfig = {
    title: string;
    description?: string;
    options: Record<string, string[]>;
};

export const GuessLayout = ({previewOnly}: GuessLayoutProps) => {
    const {sourceData} = useSourceData();
    const {setItem, getItem} = useStorage();
    const savedConfig = JSON.parse((getItem('viewConfig', 'local') || '[]') as string);

    const [data, setData] = useState<GetReportResponse[] | null>(null);
    const [viewConfigs, setViewConfigs] = useState<ViewConfig[]>(
        savedConfig || [{title: 'Chart#1', description: '-', options: {}}],
    );
    const [section, setSection] = useState<Section>(Section.Overview);

    useEffect(() => {
        if (section !== Section.Overview) {
            return;
        }

        // eslint-disable-next-line no-console
        setData(getReport(sourceData));
    }, [section, sourceData]);

    const saveViewConfig = useCallback(
        (index: number) =>
            memoize((config: Record<string, string[]>) => {
                const newConfig = JSON.parse(JSON.stringify(viewConfigs));
                newConfig[index].options = JSON.parse(JSON.stringify(config));
                setViewConfigs(newConfig);
                setItem('viewConfig', JSON.stringify(newConfig), 'local');
            }),
        [setItem, viewConfigs],
    );

    const handleAddChart = () => {
        setViewConfigs([...viewConfigs, {title: `Chart#${viewConfigs.length + 1}`, options: {}}]);
    };

    const handleDeleteChart = (index: number) => () => {
        const newConfig = JSON.parse(JSON.stringify(viewConfigs));
        newConfig.splice(index, 1);
        setViewConfigs(newConfig);
    };

    const onChangeTitle = (index: number) => (value: string) => {
        const newConfig = JSON.parse(JSON.stringify(viewConfigs));
        newConfig[index].title = value;
        setViewConfigs(newConfig);
    };

    const onChangeDescription = (index: number) => (value: string) => {
        const newConfig = JSON.parse(JSON.stringify(viewConfigs));
        newConfig[index].description = value;
        setViewConfigs(newConfig);
    };

    return (
        <div className={styles.container}>
            <div className={styles['main-navigation']}>
                <NavButton text="Overview" onClick={() => setSection(Section.Overview)}></NavButton>
                <NavButton text="Period" onClick={() => setSection(Section.Period)}></NavButton>
                <NavButton text="Products" onClick={() => setSection(Section.Products)}></NavButton>
                <NavButton text="Plans" onClick={() => setSection(Section.Plans)}></NavButton>
            </div>
            <div className={styles['section']}>
                {section === Section.Overview && data ? (
                    <div>
                        {viewConfigs.map((config, index) => {
                            const getConfig = memoize((vc: ViewConfig[], i) => {
                                return vc[i].options;
                            });

                            return (
                                <Chart
                                    key={index}
                                    reportData={data}
                                    title={config.title}
                                    description={config.description}
                                    onChangeTitle={onChangeTitle(index)}
                                    onChangeDescription={onChangeDescription(index)}
                                    saveViewConfig={saveViewConfig(index)}
                                    viewConfig={getConfig(viewConfigs, index)}
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
                {section === Section.Period ? <GuessPeriodForm previewOnly={previewOnly} /> : null}
                {section === Section.Products ? (
                    <GuessProductList previewOnly={previewOnly} />
                ) : null}
                {section === Section.Plans ? <GuessPlanList previewOnly={previewOnly} /> : null}
            </div>
        </div>
    );
};
