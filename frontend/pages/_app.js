// This import is to try fix the weird next Link issue with css.
// c.f. https://github.com/zeit/next-plugins/issues/282
import "../static/empty.css";
import Router from "next/router";
import styled from "styled-components";
import Head from "next/head";
import App from "next/app";
import LogRocket from "logrocket";
import getConfig from "next/config";
import setupLogRocketReact from "logrocket-react";
import * as Sentry from "@sentry/browser";
// TODO: Context Providers need to be imported here and used to wrap the app below.

const { publicRuntimeConfig = {} } = getConfig() || {};

// NOTE: we have to access directly or else Next can't read it properly.
/* eslint-disable */
const LOGROCKET_PROJECT_ID = publicRuntimeConfig.LOGROCKET_PROJECT_ID;
const SENTRY_DSN = publicRuntimeConfig.SENTRY_DSN;
/* eslint-enable */

Sentry.init({ dsn: SENTRY_DSN });

// only initialize when in the browser
if (process.browser) {
  LogRocket.init(LOGROCKET_PROJECT_ID);
  setupLogRocketReact(LogRocket);
  LogRocket.getSessionURL((sessionURL) => {
    Sentry.configureScope((scope) => {
      scope.setExtra(`sessionURL`, sessionURL);
    });
  });
}

const Styler = styled.div`
  .ant-btn {
    border-radius: 16px;
  }

  .ant-select-selection {
    border-radius: 16px;
  }

  .ant-input {
    border-radius: 16px;
  }
`;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    Router.events.on(`routeChangeComplete`, () => {
      window.scrollTo(0, 0);
    });
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Boilerplate todo app</title>
        </Head>

        <Styler>
          <Component {...pageProps} />
        </Styler>
      </>
    );
  }
}

export default MyApp;
