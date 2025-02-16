const Application = require("../models/applicationModel");

exports.createApplication = (req, res) => {
    const { student_name, email, program } = req.body;
    Application.create(student_name, email, program, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Application submitted successfully!", id: result.insertId });
    });
};

exports.getApplications = (req, res) => {
    Application.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
