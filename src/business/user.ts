import {Report} from './report';
import {PlanName, SourceData} from './types';
import {wrapper} from './utils';

type UpdateUsersArgs = {
    source: SourceData;
    report: Report;
    month: number;
};

export const updateUsers = ({report, source}: UpdateUsersArgs) => {
    wrapper(report, (key: PlanName) => {
        const plan = source.plans.find((p) => p.id === key);
        if (!plan) {
            return;
        }

        const sourceData = plan.sourceOfUserAqcusition
            ? report[plan.sourceOfUserAqcusition].users
            : report[key].users;

        let usersDiff = Math.ceil(sourceData * plan.growthRate || plan.minimalGrowthCount);
        if (usersDiff < plan.minimalGrowthCount) {
            usersDiff = plan.minimalGrowthCount;
        }

        /* eslint-disable no-param-reassign */
        report[key].usersDiff = usersDiff;
        report[key].users += usersDiff;
        /* eslint-enable no-param-reassign */
    });
};

export const correctUsers = ({report, source}: UpdateUsersArgs) => {
    wrapper(report, (key: PlanName) => {
        const plan = source.plans.find((p) => p.id === key);
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

export const calculateCosts = ({report, source}: UpdateUsersArgs) => {
    wrapper(report, (key: PlanName) => {
        const plan = source.plans.find((p) => p.id === key);
        if (!plan) {
            return;
        }

        // eslint-disable-next-line no-param-reassign
        report[key].marketingCosts = report[key].usersDiff * plan.cac;
    });
};
