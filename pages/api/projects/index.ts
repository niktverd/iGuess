import {collection, doc, getDocs} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';

import db from '../../../configs/firebase';
import {SourceData} from '../../../src/business/types';
import {DataBase} from '../../../src/types/api';
import {obtainToken} from '../../../src/utils/api';

async function getProjectList(req: NextApiRequest, res: NextApiResponse<DataBase<SourceData[]>>) {
    const token = await obtainToken(req, res);

    const guessCollectionRef = collection(db, 'guesses');
    const guessDocRef = doc(guessCollectionRef, token.sub);
    const projectCollectionRef = collection(guessDocRef, 'projects');
    const docSnaps = await getDocs(projectCollectionRef);

    if (docSnaps.empty) {
        res.status(404).json({ok: false, message: 'Projects are not found', data: []});
        return;
    }

    res.json({
        ok: true,
        message: 'Success',
        data: docSnaps.docs.map((docEnt) => docEnt.data() as SourceData),
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataBase>) {
    if (req.method === 'GET') {
        getProjectList(req, res);
        return;
    }

    res.status(404).json({ok: false, message: 'not found'});
    return;
}
