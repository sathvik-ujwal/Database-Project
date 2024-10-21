import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: "root",
    password: "password",
    database: "song_library_management_system",
  })
  .promise();

export async function getSongs() {
  const [rows] = await pool.query("SELECT * FROM songs");
  return rows;
}

export async function addSong(
  song_id,
  title,
  artist_id,
  album_id,
  genre,
  play_count,
  released_on
) {
  const [result] = await pool.query(
    `
    INSERT INTO songs (song_id, title, artist_id, album_id, genre, play_count, released_on)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [song_id, title, artist_id, album_id, genre, play_count, released_on]
  );
  return result;
}

export async function playSong(user_id, song_id) {
  await pool.query(
    `
    INSERT INTO user_plays_song (user_id, song_id)
    VALUES (?, ?)
  `,
    [user_id, song_id]
  );
}

export async function topSongs() {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM songs 
    ORDER BY play_count DESC
    LIMIT 10
    `
  );
  return rows;
}

export async function getSongByGenre(genre) {
  const [rows] = await pool.query(
    `
    SELECT * from songs where genre = ?`,
    [genre]
  );
  return rows;
}

export async function getSongbySearch() {
  const [rows] = await pool.query(
    `
    SELECT songs.title AS song_title,
    Artist.name AS artist_name,
    album.title AS album_title,
    songs.genre
    FROM songs
    JOIN Artist ON songs.artist_id = Artist.artist_id
    JOIN album ON songs.album_id = album.album_id;
    `
  );
  return rows;
}
