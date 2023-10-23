import {collection, doc, getDoc, getDocs} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';
import {uuid} from 'uuidv4';

import db from '../../../configs/firebase';
import {Project} from '../../../src/business/types';
import {initialProject} from '../../../src/contexts/ProjectsContext';
import {DataBase} from '../../../src/types/api';
import {obtainToken, writeProjectToDataBase} from '../../../src/utils/api';
import {deepCopy} from '../../../src/utils/json';

async function getProjectList(req: NextApiRequest, res: NextApiResponse<DataBase<Project[]>>) {
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
        data: docSnaps.docs.map((docEnt) => docEnt.data() as Project),
    });
}
async function getProjectById(req: NextApiRequest, res: NextApiResponse<DataBase<Project | null>>) {
    const tokenId = await obtainToken(req, res);
    const {projectId} = req.query as Partial<{
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
    if (req.method === 'GET' && !req.query.projectId) {
        getProjectList(req, res);
        return;
    }

    if (req.method === 'GET' && req.query.projectId) {
        getProjectById(req, res);
        return;
    }

    if (req.method === 'POST') {
        addProject(req, res);
        return;
    }

    res.status(404).json({ok: false, message: 'Method not found'});
    return;
}
