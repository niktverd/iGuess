import {PlanName} from './plan';
import {Report} from './report';
import {wrapper} from './utils';

type SummaryArgs = {
    report: Report;
    month?: number;
};

export const summary = ({report}: SummaryArgs) => {
    wrapper(report, (key: PlanName) => {
        if (key !== PlanName.Total) {
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
