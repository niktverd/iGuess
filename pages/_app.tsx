import React from 'react';

import type {AppProps} from 'next/app';

import '../styles/globals.css';

export const APP_VERSION = 'v1.0.0';

function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
