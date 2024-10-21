/*
import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: "root",
    password: "password",
    database: "notes_app",
  })
  .promise();

export async function getBooks() {
  const [rows] = await pool.query("SELECT * FROM book");
  return rows;
}

export async function addBook(ISBN, title, author, price, rating) {
  const [result] = await pool.query(
    `
    INSERT INTO book (ISBN, title, author, price, rating)
    VALUES (?, ?, ?, ?, ?)
    `,
    [ISBN, title, author, price, rating]
  );
  return result;
}

export async function readBook(ISBN) {
  await pool.query(
    `
    INSERT INTO book_reads (ISBN)
    VALUES (?)
  `,
    [ISBN]
  );
}

export async function topBooks() {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM book 
    ORDER BY read_count DESC
    LIMIT 10
    `
  );
  return rows;
}
*/

/*
import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: "root",
    password: "password",
    database: "notes_app",
  })
  .promise();

export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows;
}

export async function getNotesDesc() {
  cosnt[rows] = await pool.query("SELECT * FROM notes order by id desc");
  return rows;
}

export async function getNotesTop() {
  const [rows] = await pool.query("SELECT * FROM notes LIMIT 10");
  return rows;
}

export async function getNotesDescTop() {
  cosnt[rows] = await pool.query("SELECT * FROM notes order by id desc LIMIT");
  return rows;
}

export async function getNote(id, title) {
  const [rows] = await pool.query(
    `
  SELECT *
  FROM notes
  WHERE id = ? or title like ?
  `,
    [id, `%${title}%`]
  );
  return rows;
}

export async function createNote(title, contents) {
  const [result] = await pool.query(
    `
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `,
    [title, contents]
  );
  const id = result.insertId;
  return getNote(id);
}

/*
const notes = await getNotes();
console.log(notes);

const note = await getNote(1);
console.log(note);

const result = await createNote("test", "test");
console.log(result);

*/
