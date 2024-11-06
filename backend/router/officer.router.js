const auth = require('../authMiddleware.js')
module.exports = app => {
    const Officer = require("../controller/officer.controller.js");
    var router = require("express").Router();
    // Register a Officer
    router.post("/register", Officer.register);
    router.post("/login", Officer.login);
    router.put("/approve",auth, Officer.approve);
    router.get("/all",auth, Officer.all);
    router.get("/concessions",auth, Officer.getConcession);
    router.get("/dashboard",auth, Officer.findOne);
    app.use('/api/officer', router);
};