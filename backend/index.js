const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

// This is the Mysql database connection 
const db = mysql.createConnection({
    host: "localhost",
    database: "bookshopdb",
    user: "root",
    password: ''
});

// If there is a connection problem us the follow sql command bellow
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

// This the Middleware section 
app.use(cors());
app.use(express.json());

// This the route section 
app.get("/", (req, res) => {
    res.status(200).json("There are no books currently please chck later")
});

app.get("/books", (req, res) => {
    const getAllBooks = "SELECT * FROM bookshopdb.books";
    db.query(getAllBooks, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data); 
    })
});
 
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`titles`,`descriptions`,`covers`, `sizes`,`authors`,`categories`,`pages`) VALUES(?)";
    const values = [
        req.body.titles,
        req.body.descriptions,
        req.body.covers,
        req.body.sizes,
        req.body.authors,
        req.body.categories,
        req.body.pages
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has created successfully").status(200);

    })
});


const PORT = process.env.PORT || 8800;
app.listen(PORT, ()=>{
    console.log(`app is listening to ${PORT}`);
});