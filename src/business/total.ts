import {omit} from 'lodash';

import {PlanReport, Report} from './report';
import {SourceData} from './types';
import {PlanName} from './types/plans';
import {wrapper} from './utils';

type CalculateTotalArgs = {
    source: SourceData;
    report: Report;
};

export const calculateTotal = ({report, source: _}: CalculateTotalArgs) => {
    wrapper(report, (key: PlanName) => {
        const reports = omit(report, 'team', 'total');
        const planReport = reports[key];
        if (!planReport) {
            return;
        }

        const reportKeys = Object.keys(planReport) as (keyof PlanReport)[];

        reportKeys.forEach((reportKey) => {
            if (
                typeof report.total[reportKey] === 'number' &&
                typeof report[key][reportKey] === 'number'
            ) {
                // eslint-disable-next-line no-param-reassign
                report.total[reportKey] += report[key][reportKey];
            }
        });

        // eslint-disable-next-line no-param-reassign
        report.total = omit(
            report.total,
            'salesCountByProduct',
            'profitByProduct',
            'revenueByProduct',
        );
    });
};
