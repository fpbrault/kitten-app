import { Provider, signIn, useSession } from 'next-auth/client';

import { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }: any) => {
    function Auth({ children }) {
        const [session, loading] = useSession();
        const isUser = !!session?.user;
        React.useEffect(() => {
            if (loading) return; // Do nothing while loading
            if (!isUser) signIn(); // If not authenticated, force log in
        }, [isUser, loading]);

        if (isUser) {
            return children;
        }

        // Session is being fetched, or no user.
        // If no user, useEffect() will redirect.
        return <div>Loading...</div>;
    }
    return (
        <Provider session={pageProps.session}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {Component.auth ? (
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                ) : (
                    <Component {...pageProps} />
                )}
            </MuiPickersUtilsProvider>
        </Provider>
    );
};

export default App;
