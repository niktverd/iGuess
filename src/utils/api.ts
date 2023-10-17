import {getToken} from 'next-auth/jwt';
import type {NextApiRequest, NextApiResponse} from 'next/types';

import {DataBase} from '../types/api';

const secret = process.env.NEXTAUTH_SECRET;

export const obtainToken = async (req: NextApiRequest, res: NextApiResponse<DataBase>) => {
    const token = await getToken({req, secret});
    if (!token?.sub) {
        const errorMessage = 'You must be logged in.';
        res.status(401).json({ok: false, message: errorMessage});
        throw new Error(errorMessage);
    }

    return token;
};

export const obtainConfig = async (req: NextApiRequest, res: NextApiResponse<DataBase>) => {
    const {body} = req;
    if (!body.projectId) {
        const errorMessage = 'Project ID is not provided';
        res.status(404).json({ok: false, message: errorMessage});

        throw new Error(errorMessage);
    }

    return body;
};
