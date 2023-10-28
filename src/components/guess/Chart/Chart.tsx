import React, {useState} from 'react';

import {ChartMixed, Check, Pencil, TrashBin} from '@gravity-ui/icons';
import _, {flatten, omit, reverse, uniq, zip} from 'lodash';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {Project, ViewConfig} from '../../../business/types';
import {flattenObject} from '../../../business/utils';
import {ParameterControls} from '../../ParameterControls/ParameterControls';
import {randomHex} from '../../utils/common';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';

import s from './Chart.module.css';

type ReportType = {[key: string]: number | ReportType};

type ChartProps = {
    title?: string;
    description?: string;
    project: Project;
    reportData: ReportType[];
    viewConfigOptions?: ViewConfig['options'];
    previewOnly?: boolean;
    saveViewConfig?: (config: Record<string, string[]>) => void;
    handleDeleteChart?: () => void;
    onChangeTitle?: (value: string) => void;
    onChangeDescription?: (value: string) => void;
};

export const Chart = ({
    title: titleExternal,
    description: descriptionExternal,
    reportData,
    project,
    viewConfigOptions = {},
    previewOnly = false,
    saveViewConfig,
    handleDeleteChart,
    onChangeTitle,
    onChangeDescription,
}: ChartProps) => {
    const [title, setTitle] = useState('Chart #1');
    const [description, setDescription] = useState('-');
    const [graphHeight] = useState(300);
    const [editable, setEditable] = useState(false);
    const [axisByParameter, setAxisByParameter] = useState<Record<string, number>>({});
    const [options, setOptions] = useState<Record<string, string[]>>(viewConfigOptions);

    const handleTitleChange =
        !previewOnly && editable
            ? (event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value);
                  onChangeTitle?.(event.target.value);
              }
            : undefined;

    const handleDescriptionChange =
        !previewOnly && editable
            ? // React.FormEvent<HTMLDivElement>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (event: any) => {
                  setDescription(event.target.innerTex || '-');
                  onChangeDescription?.(event.target.innerText || '-');
              }
            : undefined;

    const handleSelectorSelection = (planName: string, index?: number) => () => {
        if (!index && index !== 0) {
            return;
        }

        if (Array.isArray(options[index])) {
            if (options[index].includes(planName)) {
                const newOption = {
                    ...options,
                    [index]: options[index].filter((opt) => opt !== planName),
                };
                setOptions(newOption);
                saveViewConfig?.(newOption);
            } else {
                const newOption = {...options, [index]: uniq([...options[index], planName])};
                setOptions(newOption);
                saveViewConfig?.(newOption);
            }
        } else {
            const newOption = {...options, [index]: [planName]};
            setOptions(newOption);
            saveViewConfig?.(newOption);
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
                        value={titleExternal || title}
                        className={s.input}
                        onChange={handleTitleChange}
                        disabled={!editable}
                    />
                </div>
                {editable && handleDeleteChart ? (
                    <button className={s['button-container']} onClick={handleDeleteChart}>
                        <TrashBin />
                    </button>
                ) : null}
                {previewOnly ? null : (
                    <button
                        className={s['button-container']}
                        onClick={() => setEditable(!editable)}
                    >
                        {editable ? <Check /> : <Pencil />}
                    </button>
                )}
            </div>
            <div className={s['input-container']}>
                <div
                    className={s.textarea}
                    onInput={handleDescriptionChange}
                    contentEditable={editable}
                >
                    {descriptionExternal || description}
                </div>
            </div>
            <ResponsiveContainer width="100%" height={graphHeight}>
                <LineChart
                    width={1000}
                    height={600}
                    data={flatData}
                    margin={{top: 5, right: 20, left: 10, bottom: 5}}
                >
                    <XAxis
                        dataKey="month"
                        type="category"
                        tick={true}
                        tickFormatter={(_value: string, index: number) => (index + 1).toString()}
                    />
                    <YAxis />

                    <Tooltip
                        trigger="hover"
                        contentStyle={{backgroundColor: 'rgb(0 0 0 / 0.7)'}}
                        content={<CustomTooltip project={project} />}
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
            </ResponsiveContainer>
            <div>
                {!previewOnly && editable
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
                                              project={project}
                                          />
                                      );
                                  })}
                              </div>
                          );
                      })
                    : null}
            </div>
            <div className={s['controls-group']}>
                {!previewOnly && editable
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
                              project={project}
                          />
                      ))
                    : null}
            </div>
        </div>
    );
};
