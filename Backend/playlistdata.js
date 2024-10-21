import mysql from "mysql2";
import express from "express";

const app = express();
app.use(express.json());

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: "root",
    password: "password",
    database: "song_library_management_system",
  })
  .promise();

export async function getPLaylistsByUser(user_id) {
  const [rows] = await pool.query(
    `
  SELECT playlists.playlist_id, 
  playlists.playlist_name, 
  playlists.created_on,
  playlists.image,
  COUNT(playlist_songs.song_id) AS number_of_songs
  FROM playlists
  LEFT JOIN playlist_songs ON playlists.playlist_id = playlist_songs.playlist_id
  WHERE playlists.user_id = ?
  GROUP BY playlists.playlist_id, playlists.playlist_name, playlists.created_on;
`,
    [user_id]
  );
  return rows;
}

export async function getPlaylistSongs(playlist_id) {
  const [rows] = await pool.query(
    `
    
    SELECT songs.song_id AS song_id, songs.title AS song_title, Artist.name AS artist_name, album.title AS album_title,
     songs.genre AS genre, songs.play_count AS play_count
    FROM (((playlist_songs
    JOIN songs ON playlist_songs.song_id = songs.song_id)
    JOIN album ON songs.album_id = album.album_id)
    JOIN Artist ON songs.artist_id = Artist.artist_id)
    WHERE playlist_id = ? 
    `,
    [playlist_id]
  );
  return rows;
}

export async function getPlaylistDetails(playlist_id) {
  const [result] = await pool.query(
    `
    SELECT p.playlist_id, p.playlist_name, p.created_on,p.image, COUNT(ps.song_id) AS number_of_songs
    FROM playlists p
    LEFT JOIN playlist_songs ps ON p.playlist_id = ps.playlist_id
    WHERE p.playlist_id = ?
    GROUP BY p.playlist_id;
    `,
    [playlist_id]
  );
  return result;
}

export async function createPlaylist(user_id, playlist_name) {
  const [result] = await pool.query(
    `
    INSERT INTO playlists (user_id, playlist_name)
    VALUES (?, ?)
    `,
    [user_id, playlist_name]
  );
  return result;
}

export async function addSongsToPlaylist(playlist_id, song_id) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO playlist_songs (playlist_id, song_id)
      VALUES (?, ?)
      `,
      [playlist_id, song_id]
    );
    return result;
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    throw error;
  }
}

export async function deleteSongsFromPlaylist(playlist_id, sond_id) {
  const [result] = await pool.query(
    `
    DELETE FROM playlist_songs where playlist_id = ? and song_id =?
    `,
    [playlist_id, sond_id]
  );
  return result;
}

export async function deletePlaylist(playlist_id) {
  const [result] = await pool.query(
    `
    CALL delete_playlist(?);
    `,
    [playlist_id]
  );
  return result;
}
