const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

const {
  EXTENSION_ID,
  PROXY_PATH,
  PROXY_URL,
  SCRIPT_TAG,
} = require("./constants");
const { getFdk } = require("./fdk");

/**
 * ADD APPLICATION ID
 * TO TEST THE BELOW APIs
 */
const applicationId = "648feb9d61b41309745252ff";

(async () => {
  const app = express();

  app.use(cookieParser("ext.session"));
  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(express.static(path.resolve("public")));

  /**
   * FDK INSTANCE CREATION
   */
  const fdk = await getFdk();

  /**
   * FDK HANDLER (/fp/install, /fp/auth, ...)
   */
  const fdkHandler = fdk.fdkHandler;
  app.use("/", fdkHandler);

  /**
   * API ROUTES
   */

  const apiRoutes = fdk.apiRoutes;

  //#region Tag
  /**
   * TAGS
   */
  apiRoutes.post("/tag", async (req, res) => {
    try {
      const tagsResponse = await req.platformClient
        .application(applicationId)
        .content.addInjectableTag({ body: SCRIPT_TAG });

      return res.status(200).json({ data: tagsResponse });
    } catch (error) {
      res.status(404);
    }
  });

  apiRoutes.delete("/tag/:tag_id", async (req, res) => {
    const {
      params: { tag_id },
    } = req;

    const body = {
      tags: [tag_id],
    };

    try {
      await req.platformClient
        .application(applicationId)
        .content.removeInjectableTag({ body });

      res.status(200);
    } catch (error) {
      res.status(500);
    }
  });

  apiRoutes.get("/tags", async (req, res) => {
    try {
      const tagsResponse = await req.platformClient
        .application(applicationId)
        .content.getInjectableTags();

      return res.status(200).json({ data: tagsResponse });
    } catch (error) {
      res.status(404);
    }
  });

  //#endregion

  //#region Proxy
  /**
   * PROXY
   */

  apiRoutes.post("/proxy", async (req, res) => {
    try {
      await req.platformClient.application(applicationId).partner.addProxyPath({
        EXTENSION_ID,
        body: {
          attached_path: PROXY_PATH,
          proxy_url: PROXY_URL,
        },
      });

      res.status(201);
    } catch (error) {
      res.status(500);
    }
  });

  apiRoutes.delete("/proxy", async (req, res) => {
    try {
      await req.platformClient
        .application(applicationId)
        .partner.removeProxyPath({
          EXTENSION_ID,
          attachedPath: PROXY_PATH,
        });

      res.status(200);
    } catch (error) {
      res.status(500);
    }
  });

  //#endregion

  //#region Dataloader

  apiRoutes.post("/dataloader", async (req, res) => {
    try {
      await req.platformClient
        .application(applicationId)
        .content.addDataLoader({
          body: {
            name: "LOGGED IN USER",
            service: "user",
            operation_id: "getLoggedInUser",
            type: "url",
            url: `/ext/ajio_zissan_1/application/api`,
          },
        });
      res.status(200);
    } catch (error) {
      res.status(500);
    }
  });

  apiRoutes.delete("/dataloader/:dataLoader_id", async (req, res) => {
    const {
      params: { dataLoader_id },
    } = req;

    try {
      await req.platformClient
        .application(applicationId)
        .content.deleteDataLoader({ dataLoader_id });
      res.status(200);
    } catch (error) {
      res.status(500);
    }
  });

  apiRoutes.get("/dataloaders", async (req, res) => {
    try {
      const response = await req.platformClient
        .application(applicationId)
        .content.getDataLoaders();
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500);
    }
  });

  //#endregion

  app.use(apiRoutes);

  /**
   * APPLICATION PROXY ROUTES
   */

  const applicationProxyRoutes = fdk.applicationProxyRoutes;

  applicationProxyRoutes.get("/api", (req, res) => {
    res.status(200).json({ message: "USING_PROXY_ROUTES" });
  });

  app.use("/application", applicationProxyRoutes);

  /**
   * TEST ENDPOINTS
   */

  app.get("/test", (req, res) => {
    res.status(200).json({ data: "TEST", error: null });
  });

  app.post("/test", (req, res) => {
    res.status(200).json(req.body);
  });

  /**
   * HTML
   */

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
  });

  app.listen(4000, () => console.log("SERVER IS RUNNING"));
})();
