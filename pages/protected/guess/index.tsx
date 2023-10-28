import React from 'react';

import type {NextPage} from 'next';

import {Page} from '../../../src/containers/Page/Page';
import {ProjectList} from '../../../src/containers/guess/ProjectList/ProjectList';

// import styles from 'styles/Home.module.css';

const Tasks: NextPage = () => {
    return (
        <Page selectedKey="projects">
            <ProjectList />
        </Page>
    );
};

export default Tasks;
