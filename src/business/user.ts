import {PlanName, plans} from './plan';
import {Report} from './report';
import {wrapper} from './utils';

type UpdateUsersArgs = {
    report: Report;
    month: number;
};

export const updateUsers = ({report}: UpdateUsersArgs) => {
    wrapper(report, (key: PlanName) => {
        const plan = plans.find((p) => p.name === key);
        if (!plan) {
            return;
        }

        const source = plan.sourceOfUserAqcusition
            ? report[plan.sourceOfUserAqcusition].users
            : report[key].users;

        let usersDiff = Math.ceil(source * plan.growthRate || plan.minimalGrowthCount);
        if (usersDiff < plan.minimalGrowthCount) {
            usersDiff = plan.minimalGrowthCount;
        }

        /* eslint-disable no-param-reassign */
        report[key].usersDiff = usersDiff;
        report[key].users += usersDiff;
        /* eslint-enable no-param-reassign */
    });
};

export const correctUsers = ({report}: UpdateUsersArgs) => {
    wrapper(report, (key: PlanName) => {
        const plan = plans.find((p) => p.name === key);
        if (!plan) {
            return;
        }

        const churn = Math.floor(report[key].users * plan.churnRate);
        // eslint-disable-next-line no-param-reassign
        report[key].users -= churn;

        if (!plan.sourceOfUserAqcusition) {
            return;
        }
        // eslint-disable-next-line no-param-reassign
        report[plan.sourceOfUserAqcusition].users -= report[key].usersDiff;
    });
};

export const calculateCosts = ({report}: UpdateUsersArgs) => {
    wrapper(report, (key: PlanName) => {
        const plan = plans.find((p) => p.name === key);
        if (!plan) {
            return;
        }

        // eslint-disable-next-line no-param-reassign
        report[key].marketingCosts = report[key].usersDiff * plan.cac;
    });
};
