import React from 'react';

import type {NextPage} from 'next';

import {PlanBlock} from '../src/blocks/PlanBlock/PlanBlock';
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
            <PlanBlock title="Create Plan" subtitle="Try to change plan parameters" />
            <VideoBlock
                title="iGuess: Subscription-Based Business Modeling"
                subtitle="iGuess provides smart revenue modeling for subscription-based businesses, ensuring growth and data-driven decisions."
                endBlur={70}
            />
        </Page>
    );
};

export default Home;
