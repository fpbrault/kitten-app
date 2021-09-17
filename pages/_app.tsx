import { Provider } from 'next-auth/client';

import { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider session={pageProps.session}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Component {...pageProps} />
            </MuiPickersUtilsProvider>
        </Provider>
    );
};

export default App;
