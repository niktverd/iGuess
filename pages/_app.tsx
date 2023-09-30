import React, { useState } from 'react';

import type {AppProps} from 'next/app';

import { SourceData, SourceDataContext, initialSourceData } from '../src/contexts/SourceDataContext';

import '../styles/globals.css';


export const APP_VERSION = 'v1.0.0';

function MyApp({Component, pageProps}: AppProps) {
    const [sourceData, setSourceData] = useState<SourceData>(initialSourceData);
    return <SourceDataContext.Provider value={{sourceData, setSourceData}}><Component {...pageProps} /></SourceDataContext.Provider>;
}

export default MyApp;
