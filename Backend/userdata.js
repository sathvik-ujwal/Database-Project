import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: "root",
    password: "password",
    database: "song_library_management_system",
  })
  .promise();

export async function getUserData(user_id) {
  const [rows] = await pool.query(
    `
    SELECT * from users where user_id = ?`,
    [user_id]
  );
  return rows;
}

export async function recentSongs(user_id) {
  const [rows] = await pool.query(
    `
    SELECT s.title, ups.played_at
    FROM songs s
    JOIN user_plays_song ups ON s.song_id = ups.song_id
    WHERE ups.user_id = ?
    ORDER BY ups.played_at DESC
    LIMIT 10;`,
    [user_id]
  );
  return rows;
}

export async function followersData(user_id) {
  const [rows] = await pool.query(
    `
    SELECT u.user_id, u.username AS followers
    FROM followers f
    JOIN users u ON f.follower_id = u.user_id
    WHERE f.followed_id = ? ;`,
    [user_id]
  );
  return rows;
}

export async function followingData(user_id) {
  const [rows] = await pool.query(
    `
    SELECT u.user_id, u.username AS following
    FROM followers f
    JOIN users u ON f.followed_id = u.user_id
    WHERE f.follower_id = ? ;`,
    [user_id]
  );
  return rows;
}

export async function updateUserData(
  user_id,
  newUsername,
  newEmail,
  newPassword
) {
  try {
    let sql = "UPDATE users SET";
    const values = [];
    if (newUsername) {
      sql += " username = ?,";
      values.push(newUsername);
    }
    if (newEmail) {
      sql += " email = ?,";
      values.push(newEmail);
    }
    if (newPassword) {
      sql += " password = ?,";
      values.push(newPassword);
    }

    sql = sql.slice(0, -1) + " WHERE user_id = ?";
    values.push(user_id);

    await pool.query(sql, values);

    return { success: true, message: "User data updated successfully" };
  } catch (error) {
    console.error("Error updating user data:", error);
    return { success: false, message: "Failed to update user data" };
  }
}
