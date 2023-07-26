const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
var cors = require('cors');
const { ApplicationConfig, ApplicationClient } = require("fdk-client-javascript");
// const {}
const {
  EXTENSION_ID,
  PROXY_PATH,
  PROXY_URL,
  SCRIPT_TAG,
  CLUSTER_URL
} = require("./constants");
const { getFdk } = require("./fdk");

/**
 * ADD APPLICATION ID
 * TO TEST THE BELOW APIs
 */
const application_id = "5d5c304a4df829372e2ad6d1";
const applicationToken = "nvO41gmOU";
const company_id = "1";

(async () => {
  const app = express();

  app.use('/', (req, res, next) =>{
    console.log(req.url);
    next();
  });
  app.use(cookieParser("ext.session"));
  app.use(bodyParser.json({ limit: "2mb" }));

  app.use(
    cors()
  );

  /**
   * FDK INSTANCE CREATION
   */
  const fdk = await getFdk();
  const applicationClient = await fdk.getApplicationClient(application_id, applicationToken);

  /**
   * FDK HANDLER (/fp/install, /fp/auth, ...)
   */
  const fdkHandler = fdk.fdkHandler;
  app.use("/", fdkHandler);

  /**
   * API ROUTES
   */

  const apiRoutes = fdk.apiRoutes;

  apiRoutes.post('/order', async (req, res) => {
    try {
      console.log(req.url);
      const item = await req.applicationClient.catalog.getProductDetailBySlug({slug: 'macbookpro-m2-75815793'});
      console.log('item', item);
      const addCartResponse = await applicationClient.cart.addItems({
        buyNow: true,
        body: {
          items: [{item_id: item._id}]
        }
      });
      console.log('addCart response', addCartResponse);
      return res.status(200).json({ data: {item, addCartResponse} });
    } catch (err) {
      res.send(400);
    }
  })

  //#region Tag
  /**
   * TAGS
   */
  apiRoutes.post("/tag", async (req, res) => {
    // try {
    //   console.log(req.url);
    //   const item = await applicationClient.catalog.getProductDetailBySlug({slug: 'macbookpro-m2-75815793'});
    //   console.log('item', item);
    //   const addCartResponse = await applicationClient.cart.addItems({
    //     buyNow: true,
    //     body: {
    //       items: [{item_id: item.uid}]
    //     }
    //   });
    //   console.log('addCart response', addCartResponse);
    //   return res.status(200).json({ data: {item, addCartResponse} });
    // } catch (err) {
    //   res.status(400).json({err});
    // }
    try {
      const tagsResponse = await req.platformClient
        .application(application_id)
        .content.addInjectableTag({ body: SCRIPT_TAG });
      console.log('tag injected successfully');
      return res.status(200).json({ data: {tagsResponse} });
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
        .application(application_id)
        .content.removeInjectableTag({ body });

      res.status(200);
    } catch (error) {
      res.status(400);
    }
  });

  apiRoutes.get("/tags", async (req, res) => {
    try {
      const tagsResponse = await req.platformClient
        .application(application_id)
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
      const proxyData = {
        extensionId: EXTENSION_ID,
        body: {
          attached_path: PROXY_PATH,
          proxy_url: PROXY_URL,
        },
      }
      const returnValue = await req.platformClient.application(application_id).partner.addProxyPath(proxyData);
      console.log('proxyData created with extensionId', proxyData.EXTENSION_ID)
      console.log(returnValue);
      res.status(201);
    } catch (error) {
      res.status(404);
    }
  });

  apiRoutes.delete("/proxy", async (req, res) => {
    try {
      console.log('req.platformClient.application', req.platformClient.application(application_id));
      await req.platformClient
        .application(application_id)
        .partner.removeProxyPath({
          extensionId: EXTENSION_ID,
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
        .application(application_id)
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
        .application(application_id)
        .content.deleteDataLoader({ dataLoader_id });
      res.status(200);
    } catch (error) {
      res.status(500);
    }
  });

  apiRoutes.get("/dataloaders", async (req, res) => {
    try {
      const response = await req.platformClient
        .application(application_id)
        .content.getDataLoaders();
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500);
    }
  });

  //#endregion

  app.use("/api", apiRoutes);

  /**
   * APPLICATION PROXY ROUTES
   */

  const applicationProxyRoutes = fdk.applicationProxyRoutes;

  applicationProxyRoutes.get("/api", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      console.log(req.url);
      let applicationConfig = new ApplicationConfig({
        applicationID: req.application._id,
        applicationToken: req.application.token,
        domain: CLUSTER_URL
      });
      let applicationClient = new ApplicationClient(applicationConfig);
      const userSession = await (await fdk
        .getPlatformClient(company_id))
        .application(application_id)
        .user
        .createUserSession({
          body: {
            domain: CLUSTER_URL,
            user_id: req.user._id,
          }
        })
      applicationClient.setCookie(userSession.cookie);
      
      // console.log('item', item);
      const item = await applicationClient.catalog.getProductDetailBySlug({slug: 'macbookpro-m2-75815793'});
      console.log('item', item);
      // req.applicationClient.cart._conf.domain = CLUSTER_URL;
      const addCartResponse = await applicationClient.cart.addItems({
        buyNow: true,
        body: {
          items: [{item_id: 75815793}]
        }
      });
      console.log('addCart response', addCartResponse);
      return res.status(200).json({ data: {item, addCartResponse} });
    } catch (err) {
      return res.status(400).json({err});
    }
  });

  app.use("/storefront", applicationProxyRoutes);

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
  app.use(express.static(path.resolve("public")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
  });

  app.listen(4000, () => console.log("SERVER IS RUNNING"));
})();
