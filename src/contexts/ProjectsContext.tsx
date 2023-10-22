import React from 'react';

import {Project, ProjectData} from '../business/types';

import {initialProjectData, initialSourceData} from './SourceDataContext';

export const initialProject: Project = {
    sourceData: initialSourceData,
    projectData: initialProjectData,
    viewConfigs: [],
    version: 0,
};

export type ProjectDataContextProps = {
    projectData: Project;
    setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
};

export const ProjectDataContext = React.createContext<ProjectDataContextProps>({
    projectData: initialProject,
    setProjectData: () => null,
});
