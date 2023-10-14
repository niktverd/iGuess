import {Report} from './report';
import {SourceData} from './types';
import {wrapper} from './utils';

type CalculateTeamArgs = {
    source: SourceData;
    report: Report;
    month?: number;
};

const LIMIT_FOR_WHITE_COLOR = 12;
const BLUE_COLORS_SALARY = 1000;
const WHITE_COLORS_SALARY = 2000;

export const calculateTeam = ({report, source}: CalculateTeamArgs) => {
    wrapper(report, 'byProduct', (key: string) => {
        const product = source.products.find((prdct) => prdct.id === key);
        if (!product || !product.staff) {
            return;
        }

        const salesCount = report.byProduct[key].salesCount;

        const blueColors = Math.floor(salesCount / product.staff);
        const whiteColors = Math.floor(blueColors / LIMIT_FOR_WHITE_COLOR);
        const blueColorsSalary = blueColors * BLUE_COLORS_SALARY;
        const whiteColorsSalary = whiteColors * WHITE_COLORS_SALARY;

        /* eslint-disable no-param-reassign */
        report.team.blueColors = (report.team.blueColors || 0) + blueColors;
        report.team.whiteColors = (report.team.whiteColors || 0) + whiteColors;
        report.team.blueColorsSalary = (report.team.blueColorsSalary || 0) + blueColorsSalary;
        report.team.whiteColorsSalary = (report.team.whiteColorsSalary || 0) + whiteColorsSalary;
        /* eslint-enable no-param-reassign */
    });
};
