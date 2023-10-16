// import {addDoc, collection} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getToken} from 'next-auth/jwt';
// import db from '../../../configs/firebase';

type DataBase = {
    ok?: boolean;
    msg?: string;
    message?: string;
};

const secret = process.env.NEXTAUTH_SECRET;
async function createTask(
    req: NextApiRequest,
    res: NextApiResponse<DataBase & {data?: {id: string}}>,
) {
    const token = await getToken({req, secret});
    // eslint-disable-next-line no-console
    console.log('JSON Web Token', token?.sub);

    if (!token) {
        res.status(401).json({message: 'You must be logged in.'});
        return;
    }

    res.json({
        message: 'Success',
    });
    return;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataBase>) {
    if (req.method === 'GET') {
        createTask(req, res);
        return;
    }

    res.status(404).json({ok: false});
    return;
}
