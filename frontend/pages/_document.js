/* eslint-disable jsx-a11y/media-has-caption */
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import env from "../config/environment";

// NOTE: _document.js is only rendered on server.
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <link
            async
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
            integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
            crossOrigin="anonymous"
          />
          <style>
            {`html, body {
                background: #f4f4f4;
                height: 100%;
                min-height: 100%;
                width: 100%;
                font-family: Source Sans Pro, sans-serif;
                font-size: 1rem;
                font-weight: 300;
                line-height: 1.6;
                letter-spacing: 0.5px;
                color: #323c47;
                margin: 0;
                padding: 0;
                overflow-x: hidden;
                overflow-y: auto;

                * {
                  -webkit-overflow-scrolling: touch;
                }
              }`}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
