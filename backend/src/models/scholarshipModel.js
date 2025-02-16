const db = require("../config/db");

const Scholarship = {
    getAll: (callback) => {
        const sql = "SELECT * FROM scholarships";
        db.query(sql, callback);
    }
};

module.exports = Scholarship;
