import React, {useEffect, useState} from 'react';

import {uniq} from 'lodash';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis} from 'recharts';

import {GetReportResponse, getReport} from '../../business/report';
import {Plan, Product} from '../../business/types';
import {NavButton} from '../../components/NavButton/NavButton';
import {ParameterControls} from '../../components/ParameterControls/ParameterControls';
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

const randomHex = ({min = 0, max = 255}: {min?: number; max?: number}) => {
    const r = Math.round(Math.random() * (max - min) + min).toString(16);
    const g = Math.round(Math.random() * (max - min) + min).toString(16);
    const b = Math.round(Math.random() * (max - min) + min).toString(16);

    return `#${r}${g}${b}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({active, payload, label, contentStyle}: any) => {
    const {sourceData} = useSourceData();

    if (active && payload && payload.length) {
        const plans = sourceData.plans.reduce((acc, plan) => {
            // eslint-disable-next-line no-param-reassign
            acc[plan.id] = {...plan};
            return acc;
        }, {} as Record<string, Plan>);
        const products = sourceData.products.reduce((acc, product) => {
            // eslint-disable-next-line no-param-reassign
            acc[product.id] = {...product};
            return acc;
        }, {} as Record<string, Product>);

        return (
            <div className="custom-tooltip" style={{...contentStyle, padding: 15}}>
                <div>{label}</div>
                {payload.map((pl: Record<string, string>, index: number) => {
                    const labelParts = `${pl.name}`.split('.');
                    const newLabel = labelParts
                        .map((lp: string) => {
                            if (['byPlan', 'byProduct'].includes(lp)) {
                                return null;
                            }

                            if (plans[lp]) {
                                return plans[lp].name;
                            }
                            if (products[lp]) {
                                return products[lp].name;
                            }

                            return lp;
                        })
                        .filter(Boolean);

                    return (
                        <p
                            key={pl.name}
                            style={{color: pl.color}}
                            className="label"
                        >{`${newLabel.join(' ')} : ${payload[index].value}`}</p>
                    );
                })}
            </div>
        );
    }

    return null;
};

export const GuessLayout = (_props: GuessLayoutProps) => {
    const {sourceData} = useSourceData();
    const [kind] = useState<string>('byPlan');
    const [items, setItems] = useState<string[]>([]);
    const [parameters, setParameters] = useState<string[]>([]);
    const [axisByParameter, setAxisByParameter] = useState<Record<string, number>>({});
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

    const dataKeys = [];
    for (const param of parameters) {
        for (const item of items) {
            dataKeys.push(`${kind}.${item}.${param}`);
        }
    }

    const handlePlanSelection = (planName: string) => () => {
        if (items.includes(planName)) {
            setItems(items.filter((item) => item !== planName));
        } else {
            setItems([...items, planName]);
        }
    };

    const handleParameterSelection = (paramName: string) => () => {
        if (parameters.includes(paramName)) {
            setParameters(parameters.filter((param) => param !== paramName));
        } else {
            setParameters([...parameters, paramName]);
        }
    };

    const handleParameterAxisSelection = (paramName: string, step: number) => () => {
        let value =
            typeof axisByParameter[paramName] === 'number' ? axisByParameter[paramName] + step : 0;
        if (value < 0) {
            value = 0;
        }

        setAxisByParameter({...axisByParameter, [paramName]: value});
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
                {section === Section.Overview && flatData ? (
                    <div>
                        <div className={styles.view}>
                            <button>Chart</button>
                            <button>Table</button>
                        </div>
                        <div className={styles.kind}>
                            <button>By Plan</button>
                            <button>By Product</button>
                        </div>
                        <div className={styles['chars-layout']}>
                            <div>
                                {sourceData.plans.map((p) => {
                                    return (
                                        <button key={p.id} onClick={handlePlanSelection(p.id)}>
                                            {p.name}
                                        </button>
                                    );
                                })}
                            </div>
                            <div>
                                <LineChart
                                    width={800}
                                    height={600}
                                    data={flatData}
                                    margin={{top: 5, right: 20, left: 10, bottom: 5}}
                                >
                                    <XAxis dataKey="month" />
                                    <Tooltip
                                        contentStyle={{backgroundColor: 'black'}}
                                        content={<CustomTooltip />}
                                    />
                                    <CartesianGrid stroke="#050505aa" />
                                    {uniq(dataKeys).map((dk) => {
                                        const splitedDK = dk.split('.');
                                        const axisRef = splitedDK[splitedDK.length - 1];
                                        const axisId = axisByParameter[axisRef];
                                        return (
                                            <Line
                                                key={dk}
                                                type="monotone"
                                                dataKey={dk}
                                                stroke={randomHex({min: 150})}
                                                yAxisId={axisId || 0}
                                            />
                                        );
                                    })}
                                </LineChart>
                            </div>
                            <div>
                                <ParameterControls
                                    paramKey="profit"
                                    axis={axisByParameter.profit}
                                    text="Profit"
                                    onSelect={handleParameterSelection}
                                    onSelectAxis={handleParameterAxisSelection}
                                />
                                <ParameterControls
                                    paramKey="cost"
                                    axis={axisByParameter.cost}
                                    text="Cost"
                                    onSelect={handleParameterSelection}
                                    onSelectAxis={handleParameterAxisSelection}
                                />
                                <ParameterControls
                                    paramKey="revenue"
                                    axis={axisByParameter.revenue}
                                    text="Revenue"
                                    onSelect={handleParameterSelection}
                                    onSelectAxis={handleParameterAxisSelection}
                                />
                                <ParameterControls
                                    paramKey="marketingCosts"
                                    axis={axisByParameter.marketingCosts}
                                    text="marketingCosts"
                                    onSelect={handleParameterSelection}
                                    onSelectAxis={handleParameterAxisSelection}
                                />
                                <ParameterControls
                                    paramKey="users"
                                    axis={axisByParameter.users}
                                    text="users"
                                    onSelect={handleParameterSelection}
                                    onSelectAxis={handleParameterAxisSelection}
                                />
                                <ParameterControls
                                    paramKey="usersDiff"
                                    axis={axisByParameter.usersDiff}
                                    text="usersDiff"
                                    onSelect={handleParameterSelection}
                                    onSelectAxis={handleParameterAxisSelection}
                                />
                                <ParameterControls
                                    paramKey="salesCount"
                                    axis={axisByParameter.salesCount}
                                    text="salesCount"
                                    onSelect={handleParameterSelection}
                                    onSelectAxis={handleParameterAxisSelection}
                                />
                            </div>
                        </div>

                        {/* <LineChart
                        width={800}
                        height={400}
                        data={flatData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                        <XAxis dataKey="month" />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="byPlan.f869c214-4d56-44b3-ae0b-b81e3110758a.cost" stroke="#ff7300" yAxisId={0} />
                        <Line type="monotone" dataKey="byPlan.f869c214-4d56-44b3-ae0b-b81e3110758a.profit" stroke="#387908" yAxisId={0} />
                        <Line type="monotone" dataKey="byPlan.f869c214-4d56-44b3-ae0b-b81e3110758a.revenue" stroke="#837908" yAxisId={0} />
                        <Line type="monotone" dataKey="byPlan.f869c214-4d56-44b3-ae0b-b81e3110758a.salesCount" stroke="#837908" yAxisId={1} />
                    </LineChart> */}
                    </div>
                ) : null}
                {section === Section.Period ? <GuessPeriodForm /> : null}
                {section === Section.Products ? <GuessProductList /> : null}
                {section === Section.Plans ? <GuessPlanList /> : null}
            </div>
        </div>
    );
};
