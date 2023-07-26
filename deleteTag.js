const { getFdk } = require("./fdk");

getFdk().getPlatformClient('1').then((platformClient) => {
    platformClient
        .application(application_id)
        .content.
        removeInjectableTag({
            body: {
                tags: [tag_id],}
            })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => console.error(err));
});

