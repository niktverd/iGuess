import {Report} from './report';
import {SourceData} from './types';

type SummaryArgs = {
    source: SourceData;
    report: Report;
    month?: number;
};

export const summary = ({report}: SummaryArgs) => {
    const costs =
        report.total.marketingCosts +
        report.total.cost +
        report.team.blueColorsSalary +
        report.team.whiteColorsSalary;

    // eslint-disable-next-line no-param-reassign
    report.total.balance = report.total.revenue - costs;
};
