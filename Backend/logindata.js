import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: "root",
    password: "password",
    database: "song_library_management_system",
  })
  .promise();

export async function createuser(username, email, password) {
  await pool.query(
    `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
      `,
    [username, email, password]
  );
}

export async function getUserByUsernameAndPassword(email, password) {
  try {
    const [results] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    return results;
  } catch (error) {
    throw error;
  }
}

export async function getUserIdfromLogin(email) {
  try {
    const result = await pool.query(
      "SELECT user_id from users WHERE email = ?",
      [email]
    );
    return result;
  } catch (error) {
    throw error;
  }
}
