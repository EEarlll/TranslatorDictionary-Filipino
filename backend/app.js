// const sqlite3 = require("sqlite3").verbose();
const path = require("node:path");
const dictionary = require("./dictionary.json");

const pool = require("./db");
let sql;
let example = "";

// const db = new sqlite3.Database(
//   path.resolve(__dirname, "Translator.db"),
//   sqlite3.OPEN_READWRITE,
//   (err) => {
//     if (err) return console.error(err.message);
//   }
// );


dictionary.forEach((element) => {
  let word = element.word;
  let definition = element.definition;
  let language = element.language;
  sql = `INSERT INTO dictionary(word, definition, type) VALUES ($1, $2, $3)`;
  pool.query(sql, [word, definition, language], (err, results) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Row inserted:", results.rowCount);
    }
  });
});

// dictionary.forEach((element) => {
//   let word = element.word;
//   let definition = element.definition;
//   let language = element.language;
//   sql = `INSERT INTO dictionary(word, definition, type) VALUES (?, ?, ?)`;
//   db.run(sql, [word, definition, language], (err) => {
//     if (err) return console.error(err.message);
//   });
// });

// fts
// sql = `DROP TABLE dictionary_fts`;
// // sql = `CREATE VIRTUAL TABLE dictionary_fts USING fts5(word, definition, type, example, tokenize='trigram')`;
// // sql = `INSERT INTO dictionary_fts (word,definition, type, example) SELECT word, definition, type, example FROM dictionary`
// // sql = `ALTER TABLE dictionary ADD created_by`;
// db.run(sql, [], (err) => {
//   if (err) return console.error(err.message);
// });

// Create table
// sql = `CREATE TABLE dictionary(id INTEGER PRIMARY KEY, word, definition, type,example, created_by)`;
// db.run(sql)

// INSERT
// sql = `INSERT INTO dictionary(word, definition, type, example) VALUES (?, ?, ?, ?)`;
// db.run(
//   sql,
//   [
//     "aalug-alog",
//     "aalug-alog adj. shaky; rickety",
//     "aalug-alog ang barko sa aming trabaho",
//   ],
//   (err) => {
//     if (err) return console.error(err.message);
//   }
// );

// SELECT
// sql = `SELECT * from dictionary`;
// db.all(sql, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   rows.forEach((element) => {
//     console.log(element);
//   });
// });

// UPDATe
// sql = `UPDATE dictionary SET example = ? WHERE id = ?`;
// db.run(sql, ['eee', 1], (err) => {
//       if (err) return console.error(err.message);
// })
