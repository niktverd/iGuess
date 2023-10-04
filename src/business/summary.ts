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
            report.total.cost;

        console.log(costs);

        // eslint-disable-next-line no-param-reassign
        report.total.balance = report.total.profit - costs;
};
