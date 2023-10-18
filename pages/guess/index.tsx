import React from 'react';

import type {NextPage} from 'next';

import {GuessLayout} from '../../src/containers/GuessLayout/GuessLayout';
import {Page} from '../../src/containers/Page/Page';

const Tasks: NextPage = () => {
    return (
        <Page>
            <GuessLayout previewOnly={false} />
        </Page>
    );
};

export default Tasks;
