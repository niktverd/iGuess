import {collection, doc, getDoc, setDoc} from 'firebase/firestore/lite';
import {getToken} from 'next-auth/jwt';
import type {NextApiRequest, NextApiResponse} from 'next/types';

import db from '../../configs/firebase';
import {Project} from '../business/types';
import {DataBase} from '../types/api';

const secret = process.env.NEXTAUTH_SECRET;

export const obtainToken = async (req: NextApiRequest, res: NextApiResponse<DataBase>) => {
    const token = await getToken({req, secret});
    if (!token?.sub) {
        const errorMessage = 'You must be logged in.';
        res.status(401).json({ok: false, message: errorMessage});
        throw new Error(errorMessage);
    }

    return token.sub || '';
};

export const obtainProject = async (req: NextApiRequest, res: NextApiResponse<DataBase>) => {
    const {body} = req;
    if (!body.projectData?.id) {
        const errorMessage = 'Project ID is not provided';
        res.status(404).json({ok: false, message: errorMessage});

        throw new Error(errorMessage);
    }

    if (!('sourceData' in body)) {
        const errorMessage = 'Source Data is not provided';
        res.status(404).json({ok: false, message: errorMessage});

        throw new Error(errorMessage);
    }
    if (!('viewConfig' in body)) {
        const errorMessage = 'View Config is not provided';
        res.status(404).json({ok: false, message: errorMessage});

        throw new Error(errorMessage);
    }

    return body;
};

export const writeProjectToDataBase = async ({
    project,
    tokenId,
}: {
    project: Project;
    tokenId: string;
}) => {
    const guessCollectionRef = collection(db, 'guesses');
    const guessDocRef = doc(guessCollectionRef, tokenId);
    const guessDoc = await getDoc(guessDocRef);
    if (!guessDoc.exists()) {
        await setDoc(guessDocRef, {userId: tokenId});
    }

    const version = (project.version || 0) as number;
    const newVersion = version + 1;
    const updatedBody = {...project, version: newVersion};

    const projectRef = doc(guessDocRef, 'projects', project.projectData.id);
    await setDoc(projectRef, updatedBody);

    const versionsDocRef = doc(projectRef, 'versions', newVersion.toString());
    await setDoc(versionsDocRef, updatedBody);

    return updatedBody;
};
