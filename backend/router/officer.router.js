const auth = require('../authMiddleware.js')
module.exports = app => {
    const Officer = require("../controller/officer.controller.js");
    var router = require("express").Router();
    // Register a Officer
    router.post("/register", Officer.register);
    router.post("/login", Officer.login);
    router.get("/approve",auth, Officer.approve);
    app.use('/api/officer', router);
};