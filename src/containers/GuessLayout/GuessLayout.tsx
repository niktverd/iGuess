import React, {useEffect, useState} from 'react';

import {CartesianGrid, Line, LineChart, Tooltip, XAxis} from 'recharts';

import {GetReportResponse, getReport} from '../../business/report';
// import {Plan, Product} from '../../business/types';
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
    const [kind] = useState<string>('byPlan');

    const [data, setData] = useState<GetReportResponse[] | null>(null);
    const [section, setSection] = useState<Section>(Section.Overview);

    useEffect(() => {
        if (section !== Section.Overview) {
            return;
        }

        // eslint-disable-next-line no-console
        setData(getReport(sourceData));
    }, [section, sourceData]);

    const flatData = data?.map((d, index) => ({...d.flat, month: index}));
    // console.log(flatData);

    return (
        <div className={styles.container}>
            <div className={styles['main-navigation']}>
                <NavButton text="Overview" onClick={() => setSection(Section.Overview)}></NavButton>
                <NavButton text="Period" onClick={() => setSection(Section.Period)}></NavButton>
                <NavButton text="Products" onClick={() => setSection(Section.Products)}></NavButton>
                <NavButton text="Plans" onClick={() => setSection(Section.Plans)}></NavButton>
            </div>
            <div className={styles['section']}>
                {section === Section.Overview && flatData ? (
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
                        <Chart
                            kind={kind}
                            flatData={flatData}
                            // reports={da}
                        />

                        <LineChart
                            width={800}
                            height={400}
                            data={flatData}
                            margin={{top: 5, right: 20, left: 10, bottom: 5}}
                        >
                            <XAxis dataKey="month" />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Line
                                type="monotone"
                                dataKey="total.cost"
                                stroke="#ff7300"
                                yAxisId={0}
                            />
                            <Line
                                type="monotone"
                                dataKey="total.profit"
                                stroke="#387908"
                                yAxisId={0}
                            />
                            <Line
                                type="monotone"
                                dataKey="total.revenue"
                                stroke="#837908"
                                yAxisId={0}
                            />
                            <Line
                                type="monotone"
                                dataKey="total.salesCount"
                                stroke="#837908"
                                yAxisId={1}
                            />
                            <Line
                                type="monotone"
                                dataKey="total.marketingCosts"
                                stroke="#837908"
                                yAxisId={0}
                            />
                            <Line
                                type="monotone"
                                dataKey="total.balance"
                                stroke="#ff0000"
                                yAxisId={2}
                            />
                        </LineChart>
                    </div>
                ) : null}
                {section === Section.Period ? <GuessPeriodForm /> : null}
                {section === Section.Products ? <GuessProductList /> : null}
                {section === Section.Plans ? <GuessPlanList /> : null}
            </div>
        </div>
    );
};
