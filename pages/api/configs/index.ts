import {collection, doc, getDoc} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';

import db from '../../../configs/firebase';
import {SourceData} from '../../../src/business/types';
import {DataBase} from '../../../src/types/api';
import {obtainProject, obtainToken, writeProjectToDataBase} from '../../../src/utils/api';

async function saveConfig(req: NextApiRequest, res: NextApiResponse<DataBase>) {
    const tokenId = await obtainToken(req, res);
    const project = await obtainProject(req, res);

    await writeProjectToDataBase({
        project,
        tokenId,
    });

    res.json({
        ok: true,
        message: 'Success',
    });
    return;
}

async function getConfig(req: NextApiRequest, res: NextApiResponse<DataBase<SourceData>>) {
    const tokenId = await obtainToken(req, res);
    const {projectId} = req.query as Partial<{[key: string]: string}>;
    if (!projectId) {
        res.status(404).json({ok: false, message: 'Project ID is not provided'});
        return;
    }

    const guessCollectionRef = collection(db, 'guesses');
    const guessDocRef = doc(guessCollectionRef, tokenId);
    const projectRef = doc(guessDocRef, 'projects', projectId);
    const docSnap = await getDoc(projectRef);

    if (!docSnap.exists()) {
        res.status(404).json({ok: false, message: 'Record is not found'});
        return;
    }

    res.json({
        ok: true,
        message: 'Success',
        data: docSnap.data() as SourceData,
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataBase>) {
    if (req.method === 'POST') {
        saveConfig(req, res);
        return;
    }

    if (req.method === 'GET') {
        getConfig(req, res);
        return;
    }

    res.status(404).json({ok: false, message: 'not found'});
    return;
}
