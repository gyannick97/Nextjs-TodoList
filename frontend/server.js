const express = require(`express`);
const next = require(`next`);
const path = require(`path`);
const compression = require(`compression`);

const env = require(`./config/environment`);

const { PORT } = env;

// On GAE, we want to use their port. Locally, we want to use our port.
const port = process.env.PORT || PORT;

const app = next({ dev: process.env.NODE_ENV !== `production` });
const handle = app.getRequestHandler();

const robotsOptions = {
  root: path.join(__dirname, `/static/`),
  headers: {
    "Content-Type": `text/plain;charset=UTF-8`,
  },
};

const faviconOptions = {
  root: path.join(__dirname, `/static/`),
};

const appleVerification = {
  root: path.join(__dirname, `/static/`),
};

app.prepare().then(() => {
  const server = express();
  server.use(compression());

  server.get(`*`, (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running on port: ${port}.`);
  });
});
