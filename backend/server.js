const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'crossover.proxy.rlwy.net',
    user: 'root',
    password: 'dzsPWiNKPLbepmPbTrckvzPgYMetgxDJ',
    database: 'railway',
    port: 15453
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
app.get('/',req,res) =>{
    res.send("server is running! frontend is ready to connect.");
});
const PORT=process.env.PORT||3000;
app.listen(PORT, () => {
    console.log('Server running on PORT ${port}');
});
