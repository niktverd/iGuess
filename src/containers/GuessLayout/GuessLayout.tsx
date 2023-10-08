import React, {useCallback, useEffect, useState} from 'react';

import {memoize} from 'lodash';

import {GetReportResponse, getReport} from '../../business/report';
import {NavButton} from '../../components/NavButton/NavButton';
import {Chart} from '../../components/guess/Chart/Chart';
import {useSourceData} from '../../hooks/useSourceData';
import {GuessPeriodForm} from '../guess/GuessPeriodForm/GuessPeriodForm';
import {GuessPlanList} from '../guess/GuessPlanList/GuessPlanList';
import {GuessProductList} from '../guess/GuessProductList/GuessProductList';

import styles from './GuessLayout.module.css';

type GuessLayoutProps = {};

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

export const GuessLayout = (_props: GuessLayoutProps) => {
    const {sourceData} = useSourceData();

    const [data, setData] = useState<GetReportResponse[] | null>(null);
    const [viewConfigs, setViewConfigs] = useState<ViewConfig[]>([{title: 'Chart#1', options: {}}]);
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
            }),
        [viewConfigs],
    );

    const handleAddChart = () => {
        setViewConfigs([...viewConfigs, {title: `Chart#${viewConfigs.length + 1}`, options: {}}]);
    };

    const handleDeleteChart = (index: number) => () => {
        const newConfig = JSON.parse(JSON.stringify(viewConfigs));
        newConfig.splice(index, 1);
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
                        {/* <div className={styles.view}>
                            <button>Chart</button>
                            <button>Table</button>
                        </div>
                        <div className={styles.kind}>
                            <button>By Plan</button>
                            <button>By Product</button>
                            <button>Total</button>
                        </div> */}
                        {viewConfigs.map((_config, index) => {
                            const getConfig = memoize((vc: ViewConfig[], i) => {
                                return vc[i].options;
                            });

                            return (
                                <Chart
                                    key={index}
                                    reportData={data}
                                    saveViewConfig={saveViewConfig(index)}
                                    viewConfig={getConfig(viewConfigs, index)}
                                    handleDeleteChart={handleDeleteChart(index)}
                                />
                            );
                        })}
                        <div>
                            <button onClick={handleAddChart}>+</button>
                        </div>
                    </div>
                ) : null}
                {section === Section.Period ? <GuessPeriodForm /> : null}
                {section === Section.Products ? <GuessProductList /> : null}
                {section === Section.Plans ? <GuessPlanList /> : null}
            </div>
        </div>
    );
};
