import {Report} from './report';
import {PlanName} from './types/plans';

export const wrapper = (report: Report, callback: (key: PlanName) => void) => {
    const keys = Object.keys(report.byPlan) as PlanName[];

    keys.forEach(callback);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flattenObject(obj: Object, prefix = '', result: Partial<Record<string, any>> = {}) {
    Object.entries(obj).forEach(([key, val]: string[]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (val && typeof val === 'object') {
            return flattenObject(val, newKey, result);
        }
        // eslint-disable-next-line no-param-reassign
        else {
            // eslint-disable-next-line no-param-reassign
            result[newKey] = val;
        }

        return null;
    });

    return result;
}
