import React, {SetStateAction, useState} from 'react';

import {SessionProvider} from 'next-auth/react';
import type {AppProps} from 'next/app';

import {SourceData} from '../src/business/types';
import {SourceDataContext, initialSourceData} from '../src/contexts/SourceDataContext';
import useStorage from '../src/hooks/useStorage';

import '../styles/globals.css';

export const APP_VERSION = 'v1.0.0';

function MyApp({Component, pageProps}: AppProps) {
    const {getItem, setItem} = useStorage();
    const savedSourceData = JSON.parse((getItem('sourceData', 'local') || '{}') as string);
    const ssdKeys = Object.keys(savedSourceData);
    const [sourceData, setSourceData] = useState<SourceData>(
        ssdKeys.length ? savedSourceData : initialSourceData,
    );
    const setSourceDataUpdated: React.Dispatch<React.SetStateAction<SourceData>> = (
        sd: SetStateAction<SourceData>,
    ) => {
        setSourceData(sd);
        setItem('sourceData', JSON.stringify(sd), 'local');
    };

    return (
        <SessionProvider>
            <SourceDataContext.Provider value={{sourceData, setSourceData: setSourceDataUpdated}}>
                <Component {...pageProps} />
            </SourceDataContext.Provider>
        </SessionProvider>
    );
}

export default MyApp;
