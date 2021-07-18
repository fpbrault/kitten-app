import { Provider } from 'next-auth/client';
import Head from 'next/head';
import { AppProps } from 'next/app';
import React from 'react';
import 'tailwindcss/tailwind.css';
import { Auth } from '@supabase/ui';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { supabase } from '../lib/supabaseClient';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider session={pageProps.session}>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <title>Les Petit Chatons</title>

                <link rel="manifest" href="/manifest.json" />
                <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <meta name="theme-color" content="#317EFB" />
            </Head>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Component {...pageProps} />
            </MuiPickersUtilsProvider>
        </Provider>
    );
};

export default App;
