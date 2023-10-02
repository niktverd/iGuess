import {Report} from './report';
import {SourceData} from './types';
import {PlanName} from './types/plans';
import {wrapper} from './utils';

type SummaryArgs = {
    source: SourceData;
    report: Report;
    month?: number;
};

export const summary = ({report}: SummaryArgs) => {
    wrapper(report, (key: PlanName) => {
        if (key !== 'total') {
            return;
        }

        const costs =
            report.total.marketingCosts +
            report.team.blueColorsSalary +
            report.team.whiteColorsSalary;

        // eslint-disable-next-line no-param-reassign
        report.total.balance = report.total.profit - costs;
    });
};
