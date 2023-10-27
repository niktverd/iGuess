import React from 'react';

import type {NextPage} from 'next';

import {VideoBlock} from '../src/components/VideoBlock/VideoBlock';
import {Page} from '../src/containers/Page/Page';

const Home: NextPage = () => {
    return (
        <Page>
            <VideoBlock
                title="Plan your business"
                subtitle="Sometime bigger/higher does not mean better"
            />
        </Page>
    );
};

export default Home;
