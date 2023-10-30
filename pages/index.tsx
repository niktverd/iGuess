import React from 'react';

import type {NextPage} from 'next';

import {TitleBlock} from '../src/blocks/TitleBlock/TitleBlock';
import {VideoBlock} from '../src/blocks/VideoBlock/VideoBlock';
import {Page} from '../src/containers/Page/Page';

const Home: NextPage = () => {
    return (
        <Page selectedKey="home">
            <TitleBlock
                title="iGuess: Subscription-Based Business Modeling"
                subtitle="iGuess provides smart revenue modeling for subscription-based businesses, ensuring growth and data-driven decisions."
                mainButton={{text: 'Create Project', url: '/protected/guess'}}
                secondaryButton={{text: 'Demo', url: '/guess'}}
            />
            <VideoBlock
                title="iGuess: Subscription-Based Business Modeling"
                subtitle="iGuess provides smart revenue modeling for subscription-based businesses, ensuring growth and data-driven decisions."
                endBlur={70}
            />
        </Page>
    );
};

export default Home;
