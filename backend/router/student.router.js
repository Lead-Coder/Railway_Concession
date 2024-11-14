const auth = require('../authMiddleware.js')
module.exports = app => {
    const Student = require("../controller/student.controller.js");
    var router = require("express").Router();
    // Register a Student
    router.post("/register", Student.register);
    router.post("/login", Student.login);
    router.get("/all",auth, Student.findAll);
    router.get("/dashboard",auth, Student.findOne);
    router.post("/apply",auth, Student.apply);
    router.get("/concession",auth, Student.findConcession);
    app.use('/api/student', router);
};