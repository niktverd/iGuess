import React, {useState} from 'react';

import {ChartMixed, Check, Pencil} from '@gravity-ui/icons';
import _, {flatten, omit, reverse, uniq, zip} from 'lodash';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis} from 'recharts';

import {flattenObject} from '../../../business/utils';
import {ParameterControls} from '../../ParameterControls/ParameterControls';
import {randomHex} from '../../utils/common';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';

import s from './Chart.module.css';

type ReportType = {[key: string]: number | ReportType};

type ChartProps = {
    reportData: ReportType[];
};

export const Chart = ({reportData}: ChartProps) => {
    const [title, setTitle] = useState('Chart #1');
    const [editable, setEditable] = useState(false);
    const [axisByParameter, setAxisByParameter] = useState<Record<string, number>>({});
    const [options, setOptions] = useState<Record<string, string[]>>({});

    const handleTitleChange = editable
        ? (event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
          }
        : undefined;

    const handleSelectorSelection = (planName: string, index?: number) => () => {
        if (!index && index !== 0) {
            return;
        }

        if (Array.isArray(options[index])) {
            if (options[index].includes(planName)) {
                setOptions({...options, [index]: options[index].filter((opt) => opt !== planName)});
            } else {
                setOptions({...options, [index]: uniq([...options[index], planName])});
            }
        } else {
            setOptions({...options, [index]: [planName]});
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
    const optionsEntries = (Object.entries(options) as unknown) as [string, string[]];
    for (const [__, optionArray] of optionsEntries) {
        const _dataKeys: string[] = [...dataKeys];
        for (const opt of optionArray) {
            for (const dk of _dataKeys) {
                dataKeys.push(`${dk}.${opt}`);
            }

            dataKeys.push(opt);
        }
    }

    const flatData = reportData.map((item) => flattenObject(omit(item, 'month')));
    const aok = flatData.map((item) => Object.keys(item));
    const ufaok = uniq(flatten(aok));
    const aor = ufaok.map((item) => item.split('.'));
    let maxLength = 3;
    aor.forEach((item) => {
        if (maxLength < item.length) {
            maxLength = item.length;
        }
    });
    const even = aor.map((item) => {
        while (item.length < maxLength) {
            item.unshift('');
        }

        return item;
    });
    const transposedFull = zip.apply(_, even) as string[][];
    const transposed = transposedFull.map((item) => uniq(item));
    const [params, ...restReversed] = reverse(transposed);
    const selectors = reverse(restReversed);

    return (
        <div className={s['chars-layout']}>
            <div className={s.header}>
                <div className={s['icon-container']}>
                    <ChartMixed width={36} height={36} />
                </div>
                <div className={s['input-container']}>
                    <input
                        type="text"
                        value={title}
                        className={s.input}
                        onChange={handleTitleChange}
                        disabled={!editable}
                    />
                </div>
                <button className={s['button-container']} onClick={() => setEditable(!editable)}>
                    {editable ? <Check /> : <Pencil />}
                </button>
            </div>
            <div>
                <LineChart
                    width={1000}
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
                {editable
                    ? selectors.map((group, index) => {
                          return (
                              <div key={index} className={s['controls-group']}>
                                  {group.map((pc) => {
                                      if (!pc) {
                                          return null;
                                      }

                                      return (
                                          <ParameterControls
                                              key={pc}
                                              paramKey={pc}
                                              axis={axisByParameter[pc]}
                                              text={pc}
                                              onSelect={handleSelectorSelection}
                                              index={index}
                                              selected={options[index]?.includes(pc)}
                                          />
                                      );
                                  })}
                              </div>
                          );
                      })
                    : null}
            </div>
            <div className={s['controls-group']}>
                {editable
                    ? params.map((pc) => (
                          <ParameterControls
                              key={pc}
                              paramKey={pc}
                              axis={axisByParameter[pc]}
                              text={pc}
                              index={selectors.length}
                              onSelect={handleSelectorSelection}
                              onSelectAxis={handleParameterAxisSelection}
                              selected={options[selectors.length]?.includes(pc)}
                          />
                      ))
                    : null}
            </div>
        </div>
    );
};
