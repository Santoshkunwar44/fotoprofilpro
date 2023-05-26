

module.exports = (app)=> {
    app.use("/api/auth",require("./Route/AuthRoute"));
}