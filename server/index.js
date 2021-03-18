const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM scrap_numbers";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const department = req.body.department;
  const machine = req.body.machine;
  const summary = req.body.summary;
  const datetime = req.body.datetime;
  const shift = req.body.shift;
  const amount = req.body.amount;

  const sqlInsert =
    "INSERT INTO scrap_numbers (department, machine, summary, datetime, shift, amount) VALUES (?,?,?,?,?,?)";
  db.query(sqlInsert, [department, machine, summary, datetime, shift, amount], (err, result) => {
    console.log(err);
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM scrap_numbers WHERE id = ?";

  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
