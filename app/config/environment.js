"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envType = process.env.node_env || "local";
const staging = {
  CORS_ORIGIN_WHITELIST: ["http://localhost:3004"],
  MONGODB_URI: `mongodb://heroku_8kz6dnlv:nuppej1cdf2rfvjqvnhgaaump3@ds211259.mlab.com:11259/heroku_8kz6dnlv`,
  SECRET: "doge",
};
const production = Object.assign(Object.assign({}, staging), { CORS_ORIGIN_WHITELIST: [] });
const local = Object.assign(Object.assign({}, staging), { PORT: 5000, FRONTEND_URL: "http://localhost:3004" });
const configs = {
  staging,
  production,
  local,
};
const config = configs[envType];
exports.default = config;
