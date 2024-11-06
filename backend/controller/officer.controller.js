const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Make sure to replace this with an environment variable
const db = require("../model");
const { Op, where } = require("sequelize");
const Officer = db.officer;
const Concession = db.concession;

// Register a new Officer
exports.register = async (req, res) => {
    try {
        const { username, name, officer_age, salary, password } = req.body;
        if (!officer_age || !password || !name || !username) {
            return res.status(400).send({ message: "All fields are required!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the officer
        const officer = {
            username,
            name,
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
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ message: "Officer ID and password are required!" });
        }

        // Find the officer by ID
        const officer = await Officer.findOne({ where: { username } });
        if (!officer) {
            return res.status(404).send({ message: "Officer not found!" });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, officer.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password!" });
        }
        // console.log(officer);
        // Generate a JWT token
        const token = jwt.sign({ id: officer.officer_id }, SECRET_KEY, { expiresIn: "1h" });
        res.send({ message: "Authentication successful", token });
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while logging in." });
    }
};

exports.findOne = async (req, res) => {
    try {
        const officerId = req.user.id;
        const officer = await Officer.findByPk(officerId);
        if (!officer) {
            return res.status(404).json({ message: "Officer not found" });
        }
        res.send(officer);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving officer." });
    }
}

exports.approve = async (req, res) => {
    try {
        const { concessionId, status } = req.body;
        const officerId = req.user.id;
        console.log(req.user);
        // Check if officer exists
        const officer = await Officer.findByPk(officerId);
        if (!officer) {
            return res.status(404).json({ message: "Officer not found" });
        }

        // Find the concession
        const concession = await Concession.findByPk(concessionId);
        if (!concession) {
            return res.status(404).json({ message: "Concession not found" });
        }

        // Approve the concession
        const approvalDate = new Date();
        const expiryDate = new Date();
        expiryDate.setMonth(approvalDate.getMonth() + concession.period);

        concession.approved_by = officerId;
        concession.status = status;
        concession.expiry_date = expiryDate;
        await concession.save();

        return res.status(200).json({ message: "Concession approved", concession });
    } catch (error) {
        return res.status(500).json({ message: "Error approving concession", error: error.message });
    }
};

exports.all = async (req, res) => {
    try {
        const concessions = await Concession.findAll(
            {
                where: {
                    status: "waiting"
                }
            }
        );
        res.send(concessions);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving concessions." });
    }
}

exports.getConcession = async (req, res) => {
    try {
        const officerId = req.user.id;
        const concessions = await Concession.findAll({
            where: {
                status: {
                    [Op.in]: ['active', 'rejected']
                },
                approved_by: officerId
            }
        });
        res.send(concessions);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving concessions." });
    }
};