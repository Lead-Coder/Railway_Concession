const db = require("../model");
const Concession = db.concession;
const Student = db.student;
const Officer = db.officer;

// Create and Save a new Concession Form
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.class || !req.body.quota || !req.body.application_date || !req.body.from || !req.body.to || !req.body.period || !req.body.uid || !req.body.approved_by) {
        return res.status(400).send({
            message: "All required fields (class, quota, application_date, from, to, period, uid, approved_by) must be provided!"
        });
    }

    // Create a Concession form data object
    const concessionData = {
        class: req.body.class,
        quota: req.body.quota,
        application_date: req.body.application_date,
        from: req.body.from,
        to: req.body.to,
        period: req.body.period,
        route: req.body.route,
        concession_fee: req.body.concession_fee,
        expiry_date: req.body.expiry_date,
        uid: req.body.uid,             // Foreign key linking to Student
        approved_by: req.body.approved_by // Foreign key linking to Officer
    };

    try {
        // Verify the existence of the Student and Officer
        const student = await Student.findByPk(req.body.uid);
        const officer = await Officer.findByPk(req.body.approved_by);
        
        if (!student) {
            return res.status(404).send({ message: "Student not found with the provided uid" });
        }
        if (!officer) {
            return res.status(404).send({ message: "Officer not found with the provided approved_by ID" });
        }

        // Save the Concession in the database
        const concession = await Concession.create(concessionData);
        res.status(201).send(concession);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Concession form."
        });
    }
};
