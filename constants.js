const PROXY_PATH = process.env.PROXY_PATH || "ajio_zissan_1";
/** THE LAUNCH URL */
const PROXY_URL =
  process.env.PROXY_URL || "https://77df-116-50-84-117.ngrok-free.app";

/** API KEY */
const EXTENSION_ID = process.env.EXTENSION_ID || "64914208fb9315d31ee200da";

const EXTENSION_SECRET = process.env.EXTENSION_SECRET || "L-P9hsCochBdQEZ";

const CLUSTER_URL = process.env.CLUSTER_URL || "https://api.tiraz5.de";

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
