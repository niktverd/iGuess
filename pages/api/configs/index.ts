import {collection, doc, getDoc, setDoc} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';

import db from '../../../configs/firebase';
import {SourceData} from '../../../src/business/types';
import {DataBase} from '../../../src/types/api';
import {obtainConfig, obtainToken} from '../../../src/utils/api';

async function saveConfig(req: NextApiRequest, res: NextApiResponse<DataBase>) {
    const token = await obtainToken(req, res);
    const config = await obtainConfig(req, res);

    const guessCollectionRef = collection(db, 'guesses');
    const guessDocRef = doc(guessCollectionRef, token.sub);
    const guessDoc = await getDoc(guessDocRef);
    if (!guessDoc.exists()) {
        await setDoc(guessDocRef, {userId: token.sub});
    }

    const version = (config.version || 0) as number;
    const newVersion = version + 1;
    const updatedBody = {...config, version: newVersion};

    const projectRef = doc(guessDocRef, 'projects', config.project.id);
    await setDoc(projectRef, updatedBody);

    const versionsDocRef = doc(projectRef, 'versions', newVersion.toString());
    await setDoc(versionsDocRef, updatedBody);

    res.json({
        ok: true,
        message: 'Success',
    });
    return;
}

async function getConfig(req: NextApiRequest, res: NextApiResponse<DataBase<SourceData>>) {
    const token = await obtainToken(req, res);
    const {projectId} = req.query as Partial<{[key: string]: string}>;
    if (!projectId) {
        res.status(404).json({ok: false, message: 'Project ID is not provided'});
        return;
    }

    const guessCollectionRef = collection(db, 'guesses');
    const guessDocRef = doc(guessCollectionRef, token.sub);
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
