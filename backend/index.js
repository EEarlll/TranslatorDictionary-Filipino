const { getTranslationText } = require("lingva-scraper");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const pool = require("./db");
let sql;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/translate/:source/:destination/:message", async (req, res) => {
  try {
    const { source, destination, message } = req.params;
    const translation = await getTranslationText(source, destination, message);
    console.log(translation);
    res.json({ message: translation });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/dictionary", async (req, res) => {
  try {
    let id = req.query.id || "";
    let limit = parseInt(req.query.limit) || 10;
    let offset = parseInt(req.query.offset) || 0;
    offset *= limit;

    let condition = id == "All" ? `` : `WHERE type = '${id}'`;
    sql = `SELECT * FROM dictionary ${condition} LIMIT ${limit} OFFSET ${offset}`;
    pool.query(
      `SELECT * FROM dictionary ${condition} ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`,
      (err, results) => {
        if (err) return res.json({ error: err });
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/dictionary/:word", async (req, res) => {
  try {
    const { word } = req.params;
    let id = req.query.id || "All";
    let limit = parseInt(req.query.limit) || 10;
    let offset = parseInt(req.query.offset) || 0;
    offset *= limit;
    let words;
    let sql;
    let condition = id == "All" ? "" : `AND type = '${id}'`;

    if (limit == 1) {
      words = word
        .split(" ")
        .map(
          (item, index) =>
            `word LIKE $${index + 1} AND LENGTH(word) <= ${
              item.length
            } AND type = 'Tagalog'`
        )
        .join(" OR ");
      sql = `SELECT * FROM dictionary WHERE ${words} ORDER BY length(word) ASC`;
      params = word.split(" ");
    } else {
      sql = `SELECT * FROM dictionary WHERE word LIKE $1 ${condition} ORDER BY length(word) ASC LIMIT $2 OFFSET $3`;
      params = [`%${word}%`, limit, offset];
    }

    pool.query(sql, params, (err, results) => {
      if (err) return res.json({ error: err });
      res.json(results.rows);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/dictionary/add-example", async (req, res) => {
  try {
    const { id, example, created_by } = req.body;
    sql = `UPDATE dictionary SET example = $1, created_by = $2 WHERE id = $3`;
    console.log(req.body);
    pool.query(sql, [example, created_by, id], (err) => {
      if (err) return res.json({ error: err });
      res.json({ message: `example successfully added: ${example}`, id });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});
