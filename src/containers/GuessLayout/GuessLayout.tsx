import React, {useEffect, useState} from 'react';

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

export const GuessLayout = (_props: GuessLayoutProps) => {
    const {sourceData} = useSourceData();

    const [data, setData] = useState<GetReportResponse[] | null>(null);
    const [section, setSection] = useState<Section>(Section.Overview);

    useEffect(() => {
        if (section !== Section.Overview) {
            return;
        }

        // eslint-disable-next-line no-console
        setData(getReport(sourceData));
    }, [section, sourceData]);

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
                        <div className={styles.view}>
                            <button>Chart</button>
                            <button>Table</button>
                        </div>
                        <div className={styles.kind}>
                            <button>By Plan</button>
                            <button>By Product</button>
                            <button>Total</button>
                        </div>
                        <Chart reportData={data} />
                    </div>
                ) : null}
                {section === Section.Period ? <GuessPeriodForm /> : null}
                {section === Section.Products ? <GuessProductList /> : null}
                {section === Section.Plans ? <GuessPlanList /> : null}
            </div>
        </div>
    );
};
