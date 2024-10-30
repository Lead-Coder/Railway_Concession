const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Make sure to replace this with an environment variable
const db = require("../model");
const Officer = db.officer;
const Concession = db.concession;

// Register a new Officer
exports.register = async (req, res) => {
    try {
        const { officer_age, salary, password } = req.body;
        if (!officer_age || !salary || !password) {
            return res.status(400).send({ message: "All fields are required!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the officer
        const officer = {
            officer_age,
            salary,
            password: hashedPassword
        };

        const data = await Officer.create(officer);
        res.send({ message: "Officer registered successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while registering the Officer." });
    }
};

// Login an Officer
exports.login = async (req, res) => {
    try {
        const { officer_id, password } = req.body;
        if (!officer_id || !password) {
            return res.status(400).send({ message: "Officer ID and password are required!" });
        }

        // Find the officer by ID
        const officer = await Officer.findByPk(officer_id);
        if (!officer) {
            return res.status(404).send({ message: "Officer not found!" });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, officer.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password!" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: officer.officer_id }, SECRET_KEY, { expiresIn: "1h" });
        res.send({ message: "Authentication successful", token });
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while logging in." });
    }
};

exports.approve = (req,res) =>{
    const { offcier_id } = req.user;
    
}
