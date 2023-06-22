const { setupFdk } = require("fdk-extension-javascript/express");
const { RedisStorage } = require("fdk-extension-javascript/express/storage");

const { appRedis } = require("./redis.init");
const { PROXY_URL, EXTENSION_ID, EXTENSION_SECRET, CLUSTER_URL } = require("./constants");

const storage = new RedisStorage(appRedis, "demo-ajio");

const getFdk = () => {
  return setupFdk(
    {
      api_key: EXTENSION_ID,
      api_secret: EXTENSION_SECRET,
      base_url: PROXY_URL,
      callbacks: {
        auth: async (req) => {
          return `${PROXY_URL}/?company_id=${req.query["company_id"]}`;
        },

        uninstall: async (req) => {},
      },
      storage, // add your prefix
      access_mode: "offline",
      cluster: CLUSTER_URL,
    },
    true
  );
};

module.exports = { getFdk };
