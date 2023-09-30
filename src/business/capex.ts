import {PlanName} from './plan';
import {Report} from './report';
import {wrapper} from './utils';

type CalculateTeamArgs = {
    report: Report;
    month?: number;
};

const MONTH_PLAN_FOR_BLUE_COLOR = 15 * 20;
const LIMIT_FOR_WHITE_COLOR = 12;
const BLUE_COLORS_SALARY = 1000;
const WHITE_COLORS_SALARY = 2000;

export const calculateTeam = ({report}: CalculateTeamArgs) => {
    wrapper(report, (key: PlanName) => {
        if (key !== PlanName.Total) {
            return;
        }

        const salesCount = report[key].salesCount;

        const blueColors = Math.floor(salesCount / MONTH_PLAN_FOR_BLUE_COLOR);
        const whiteColors = Math.floor(blueColors / LIMIT_FOR_WHITE_COLOR);
        const blueColorsSalary = blueColors * BLUE_COLORS_SALARY;
        const whiteColorsSalary = whiteColors * WHITE_COLORS_SALARY;

        // eslint-disable-next-line no-param-reassign
        report.team = {
            blueColors,
            whiteColors,
            blueColorsSalary,
            whiteColorsSalary,
        };
    });
};
