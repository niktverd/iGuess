import React from 'react';

import type {NextPage} from 'next';

import {GuessLayout} from '../../../src/containers/GuessLayout/GuessLayout';
import {Page} from '../../../src/containers/Page/Page';

const Guess: NextPage = () => {
    return (
        <Page>
            <GuessLayout />
        </Page>
    );
};

export default Guess;