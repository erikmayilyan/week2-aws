const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
}).promise();

async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows
};
exports.getNotes = getNotes;

async function getNote(id) {
  const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
  return rows[0];
};
exports.getNote = getNote;

async function createNote(title, contents) {
  const [result] = await pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)`, [title, contents]);
  const id = result.insertId;
  return getNote(id)
};
exports.createNote = createNote;

async function deleteNote(id) {
  const [result] = await pool.query(`DELETE FROM notes WHERE id = ?`, [id]);
  return result[0];
}
exports.deleteNote = deleteNote;