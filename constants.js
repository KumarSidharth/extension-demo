const PROXY_PATH = process.env.PROXY_PATH || "jio-workshop";
/** THE LAUNCH URL */
const PROXY_URL =
  process.env.PROXY_URL || "https://961d-14-142-183-234.ngrok-free.app";

/** API KEY */
// const EXTENSION_ID = "64213de520a5902cbce162a8"; // sid
const EXTENSION_ID = "645c92cdbf0856e798354628"; // Abhishek

// const EXTENSION_SECRET = "xaAtO5F8mBW~x8s"; // sid
const EXTENSION_SECRET = "F80V45~JPMsOSS1"; // Abhishek

const CLUSTER_URL = "https://api.fyndx1.de";

const SCRIPT_TAG = {
  tags: [
    {
      name: "script_injection",
      sub_type: "external",
      type: "js",
      position: "body-bottom",
      url: `${PROXY_URL}/application/js/script.js`,
      attributes: {
        async: true,
      },
    },
  ],
};

module.exports = {
  PROXY_PATH,
  PROXY_URL,
  EXTENSION_ID,
  SCRIPT_TAG,
  EXTENSION_SECRET,
  CLUSTER_URL
};
