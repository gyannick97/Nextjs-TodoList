// @ts-ignore
const envType = process.env.node_env || `local`;
console.log(`env type -->`, process.env.node_env || `local`);

const staging = {};

const production = {
  ...staging,
};

const local = {
  ...staging,
  API: `http://localhost:5000`,
  PORT: 3000,
};

const configs = {
  staging,
  production,
  local,
};

const config = configs[envType];

module.exports = { ...config };
