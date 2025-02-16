const db = require("../config/db");

const Application = {
    create: (student_name, email, program, callback) => {
        const sql = "INSERT INTO applications (student_name, email, program) VALUES (?, ?, ?)";
        db.query(sql, [student_name, email, program], callback);
    },

    getAll: (callback) => {
        const sql = "SELECT * FROM applications";
        db.query(sql, callback);
    }
};

module.exports = Application;
