

module.exports = (app)=> {
    app.use("/api/auth",require("./Route/AuthRoute"));
    // app.use("/api/image",require("./Route/ImageRoute"));
    app.use("/api/webhook",require("./Route/webHook"))
}