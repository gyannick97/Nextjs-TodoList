const withCSS = require(`@zeit/next-css`);
const withOptimizedImages = require(`next-optimized-images`);
const env = require(`./config/environment`);
const withLess = require(`@zeit/next-less`);
const lessToJS = require(`less-vars-to-js`);
const fs = require(`fs`);
const path = require(`path`);
const withSourceMaps = require(`@zeit/next-source-maps`);

// Load in custom LESS variables for antd.
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, `./antdVars.less`), `utf8`),
);

const nextConfig = withSourceMaps(
  withLess({
    publicRuntimeConfig: { ...env },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // Use the custom LESS variables for antd.
    },
    webpack: (config, { isServer }) => {
      // Load our icons, not all the antd icons.
      config.resolve.alias[`@ant-design/icons/lib/dist$`] = path.join(__dirname, `./icons.js`);

      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === `function`) {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === `function` ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: `null-loader`,
        });
      }

      return config;
    },
  }),
);

const withBundleAnalyzer = require(`@next/bundle-analyzer`)({
  enabled: process.env.ANALYZE === `true`,
});

module.exports = withBundleAnalyzer(withCSS(withOptimizedImages(nextConfig)));
