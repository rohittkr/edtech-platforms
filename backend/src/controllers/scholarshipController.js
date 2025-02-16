const Scholarship = require("../models/scholarshipModel");

exports.getScholarships = (req, res) => {
    Scholarship.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
