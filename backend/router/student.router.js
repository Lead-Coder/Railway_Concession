const auth = require('../authMiddleware.js')
module.exports = app => {
    const Student = require("../controller/student.contoller.js");
    var router = require("express").Router();
    // Register a Student
    router.post("/register", Student.register);
    router.post("/login", Student.login);
    router.get("/all",auth, Student.findAll);
    router.get("/apply",auth, Student.apply);
    app.use('/api/student', router);
};