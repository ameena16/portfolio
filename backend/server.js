const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root/777/999',
    database: 'ameena_portfolio'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected ✅');
});

// API to save form data
app.post('/contact', (req, res) => {
    const { name, email, messages } = req.body;

    const sql = "INSERT INTO messages (name, email, messages) VALUES (?, ?, ?)";

    db.query(sql, [name, email, messages], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error saving data");
        }
        res.send("Message saved successfully ✅");
    });
});

// start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});