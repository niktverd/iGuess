import React, { useState } from 'react';

import { uniq } from 'lodash';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis} from 'recharts';

import { useSourceData } from '../../../hooks/useSourceData';
import { ParameterControls } from '../../ParameterControls/ParameterControls';
import { randomHex } from '../../utils/common';
import { CustomTooltip } from '../CustomTooltip/CustomTooltip';

import s from './Chart.module.css';

type ChartProps = {
    kind: string;
    flatData: Record<string, number>[];
};

export const Chart = ({
    kind,
    flatData,
}: ChartProps) => {
    const {sourceData} = useSourceData();

    const [items, setItems] = useState<string[]>([]);
    const [parameters, setParameters] = useState<string[]>([]);
    const [axisByParameter, setAxisByParameter] = useState<Record<string, number>>({});

    const handleReportSelection = (planName: string) => () => {
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


    const dataKeys = [];
    for (const param of parameters) {
        for (const item of items) {
            dataKeys.push(`${kind}.${item}.${param}`);
        }
    }

    return (
        <div className={s['chars-layout']}>
            <div>
                {sourceData.plans.map((p) => {
                    return (
                        <button key={p.id} onClick={handleReportSelection(p.id)}>
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
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="month" />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'black' }}
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
                                stroke={randomHex({ min: 150 })}
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
    );
};
