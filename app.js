// import
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyPaser = require("body-parser");
const port = 3002;
// deklarasi bahwa kita memakai Template Engine
app.set("view engine", "ejs");
// connect to sql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rhoka",
});
// definiskan bahwa kita menggunakan styling(css)
app.use(express.static("public"));
// mengizinkan mengambil value di tag html(ejs)
app.use(express.urlencoded({ extended: false }));

// Router awal
app.get("/", (req, res) => {
  connection.query("SELECT * FROM items", (error, results) => {
    res.render("index", { data: results });
  });
});

// Router new
app.get("/new", (req, res) => {
  res.render("new");
});

// create data INSERT INTO items (barang) VALUES (?)
app.post("/create", (req, res) => {
  connection.query(
    "INSERT INTO items (barang) VALUES (?)",
    [req.body.itemName],
    (error, results) => {
      res.redirect("/");
    }
  );
});
// DELETE data DELETE FROM items WHERE id = ?
app.post("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM items WHERE id = ?",
    [req.params.id],
    (error, results) => {
      res.redirect("/");
    }
  );
  console.log(req.params.id);
});

// PORT
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
