import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider, useTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import {useState} from 'react';
import { useRouter } from 'next/router'
import '../src/styles.css'
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function MyApp(props) {
    const router=useRouter();
    const matches=useMediaQuery('(min-width:884px)');
    const matches2 = useMediaQuery('(min-width:743px)');
    const secondLevelMatches = useMediaQuery('(min-width:410px)');
    const thirdLevelMatches = useMediaQuery('(min-width:884px)');
    const [isRouteChanging,setIsRouteChanging]=useState(false)
    const { Component, pageProps } = props;
    const setIsRouteChange=(state)=>{setIsRouteChanging(state)}
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        router.events.on('routeChangeStart', ()=>{setIsRouteChanging(true);
        document.querySelector('.content').style.display='none';
        document.querySelector('.indicator').style.display='flex';})
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', ()=>{setIsRouteChanging(true)
                document.querySelector('.content').style.display='none';
                document.querySelector('.indicator').style.display='flex';})
        }
    }, [])

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps}
                   isRouteChanging={isRouteChanging}
                   setIsRouteChanging={setIsRouteChange}
                   router={router}
                   matches={matches}
                   matches2={matches2}
                   secondLevelMatches={secondLevelMatches}
                   thirdLevelMatches={thirdLevelMatches}
        />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
