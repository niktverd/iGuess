import {addDoc, collection} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';

import db from '../../../configs/firebase';

type DataBase = {
    ok: boolean;
    msg?: string;
};

async function createTask(
    req: NextApiRequest,
    res: NextApiResponse<DataBase & {data: {id: string}}>,
) {
    const {body} = req;
    const tasksCol = collection(db, 'tasks');
    // console.log(body);
    const document = await addDoc(tasksCol, body);
    // console.log(document.id);
    res.status(200).json({
        ok: true,
        msg: 'Task was created',
        data: {id: document.id},
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataBase>) {
    if (req.method === 'POST') {
        createTask(req, res);
        return;
    }

    res.status(404).json({ok: false});
    return;
}
