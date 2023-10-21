import {collection, doc, getDocs} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';
import {uuid} from 'uuidv4';

import db from '../../../configs/firebase';
import {Project, SourceData} from '../../../src/business/types';
import {initialProject} from '../../../src/contexts/ProjectsContext';
import {DataBase} from '../../../src/types/api';
import {obtainToken, writeProjectToDataBase} from '../../../src/utils/api';
import {deepCopy} from '../../../src/utils/json';

async function getProjectList(req: NextApiRequest, res: NextApiResponse<DataBase<SourceData[]>>) {
    const tokenId = await obtainToken(req, res);

    const guessCollectionRef = collection(db, 'guesses');
    const guessDocRef = doc(guessCollectionRef, tokenId);
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

async function addProject(req: NextApiRequest, res: NextApiResponse<DataBase<Project>>) {
    const tokenId = await obtainToken(req, res);

    const project = deepCopy(initialProject) as Project;
    project.projectData.id = uuid();

    const savedProject = await writeProjectToDataBase({
        project,
        tokenId,
    });

    res.json({
        ok: true,
        message: 'Project created',
        data: savedProject,
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataBase>) {
    if (req.method === 'GET') {
        getProjectList(req, res);
        return;
    }

    if (req.method === 'POST') {
        addProject(req, res);
        return;
    }

    res.status(404).json({ok: false, message: 'Method not found'});
    return;
}
