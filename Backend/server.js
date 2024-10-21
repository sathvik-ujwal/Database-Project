import express from "express";

import {
  createuser,
  getUserByUsernameAndPassword,
  getUserIdfromLogin,
} from "./logindata.js";
import {
  addSong,
  getSongs,
  getSongByGenre,
  topSongs,
  playSong,
  getSongbySearch,
} from "./songdata.js";

import {
  getPLaylistsByUser,
  getPlaylistSongs,
  getPlaylistDetails,
  createPlaylist,
  addSongsToPlaylist,
  deleteSongsFromPlaylist,
  deletePlaylist,
} from "./playlistdata.js";
import {
  getUserData,
  recentSongs,
  followersData,
  followingData,
  updateUserData,
} from "./userdata.js";

const app = express();
app.use(express.json());

// Endpoint to get user data
app.get("/profile/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const user_data = await getUserData(user_id);
  res.send(user_data);
});

app.get("/recentSongs/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const recent_songs = await recentSongs(user_id);
  res.send(recent_songs);
});

app.get("/followers/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const followers = await followersData(user_id);
  res.send(followers);
});

app.get("/following/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const following = await followingData(user_id);
  res.send(following);
});

// Endpoint to edit user data
app.put("/profile/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { newUsername, newEmail, newPassword } = req.body;

  const result = await updateUserData(
    user_id,
    newUsername,
    newEmail,
    newPassword
  );

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});

app.get("/songs", async (req, res) => {
  const songs = await getSongs();
  res.send(songs);
});

app.get("/searchSongs", async (req, res) => {
  const songs = await getSongbySearch();
  res.send(songs);
});

app.get("/songs/top", async (req, res) => {
  const top_songs = await topSongs();
  res.send(top_songs);
});

// Endpoint to get playlists
app.get("/playlists/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const playlists = await getPLaylistsByUser(user_id);
  res.send(playlists);
});

app.get("/playlist/:playlist_id", async (req, res) => {
  const playlist_id = req.params.playlist_id;
  const playlist_songs = await getPlaylistSongs(playlist_id);
  res.send(playlist_songs);
});

app.get("/playlistData/:playlist_id", async (req, res) => {
  try {
    const playlist_id = req.params.playlist_id;
    const playlist_details = await getPlaylistDetails(playlist_id);
    console.log(playlist_details);
    res.send(playlist_details);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/createPlaylist", async (req, res) => {
  const { user_id, playlist_name } = req.body;
  const song = await createPlaylist(user_id, playlist_name);
  res.status(201).send(song);
});

app.post("/addSongToPlaylist/:playlist_id/:song_id", async (req, res) => {
  try {
    const { playlist_id, song_id } = req.params;
    const song = await addSongsToPlaylist(playlist_id, song_id);
    res.status(201).send(song);
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    res.status(500).send("Error adding song to playlist");
  }
});

// Endpoint to delete playlists
app.post("/deleteSongFromPlaylist/:playlist_id/:song_id", async (req, res) => {
  const { playlist_id, song_id } = req.body;
  const song = await deleteSongsFromPlaylist(playlist_id, song_id);
  res.status(201).send(song);
});

app.post("/deletePlaylist/:playlist_id", async (req, res) => {
  const { playlist_id } = req.body;
  const deleted = await deletePlaylist(playlist_id);
  res.status(201).send(deleted);
});

app.post("/songs", async (req, res) => {
  try {
    const {
      song_id,
      title,
      artist_id,
      album_id,
      genre,
      play_count,
      released_on,
    } = req.body;

    if (
      !song_id ||
      !title ||
      !artist_id ||
      !album_id ||
      !genre ||
      !play_count ||
      !released_on
    ) {
      return res.status(400).send("Please provide all required fields.");
    }

    const song = await addSong(
      song_id,
      title,
      artist_id,
      album_id,
      genre,
      play_count,
      released_on
    );

    res.status(201).send(song);
  } catch (error) {
    console.error("Error adding song:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/loginid", async (req, res) => {
  const { email } = req.body;
  const email_id = await getUserIdfromLogin(email);
  res.status(201).send(email_id);
});

app.post("/songs/play", async (req, res) => {
  const { user_id, song_id } = req.body;
  const play_song = await playSong(user_id, song_id);
  res.status(201).send(play_song);
});

// Register endpoint
app.post("/registerpage", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await createuser(username, email, password);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({
      message: "Error creating user! Invalid email or password",
      error: error.sqlMessage,
    });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    const results = await getUserByUsernameAndPassword(email, password);

    if (results.length > 0) {
      const user_id = results[0].user_id;
      return res.status(200).json({ user_id, message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error executing MySQL query:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something brokw!");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
