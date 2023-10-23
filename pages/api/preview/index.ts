import {collection, doc, getDoc} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';

import db from '../../../configs/firebase';
import {Project} from '../../../src/business/types';
import {DataBase} from '../../../src/types/api';

async function getProjectById(req: NextApiRequest, res: NextApiResponse<DataBase<Project | null>>) {
    const {projectId, userId: tokenId} = req.query as Partial<{
        [key: string]: string;
    }>;
    if (!projectId) {
        res.status(404).json({ok: false, message: `Project ID was not provided`, data: null});
        return;
    }

    const guessCollectionRef = collection(db, 'guesses');
    const guessDocRef = doc(guessCollectionRef, tokenId);
    const projectCollectionRef = doc(guessDocRef, 'projects', projectId);
    const docSnap = await getDoc(projectCollectionRef);

    if (!docSnap.exists()) {
        res.status(404).json({
            ok: false,
            message: 'Project with given id is not found',
            data: null,
        });
        return;
    }

    res.json({
        ok: true,
        message: 'Success',
        data: docSnap.data() as Project,
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataBase>) {
    if (req.method === 'GET' && req.query.projectId && req.query.userId) {
        getProjectById(req, res);
        return;
    }

    res.status(404).json({ok: false, message: 'Method not found'});
    return;
}
