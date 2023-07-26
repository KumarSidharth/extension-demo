// @ts-check
const { getFdk } = require("./fdk");

getFdk()
.then(fdk => fdk.getPlatformClient('1'))
.then((platformClient) =>
    platformClient
        .application(application_id)
        .content
        .getInjectableTags())
.then(res => console.log(res))
.catch((err) => console.error(err));

