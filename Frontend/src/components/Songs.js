import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserProvider, useUser } from "./Usercontext";

export default function Songs() {
  const { user_id } = useUser();
  const [backendData, setBackendData] = useState([]);
  const [song_id, setSongId] = useState(0);
  const [title, setTitle] = useState("");
  const [artist_id, setArtistId] = useState(0);
  const [album_id, setAlbumId] = useState(0);
  const [genre, setGenre] = useState("");
  const [play_count, setPlaycount] = useState(0);
  const [released_on, setReleasedOn] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, [showTop]);

  const fetchSongs = async () => {
    try {
      const endpoint = showTop ? "/songs/top" : "/songs";
      const response = await fetch(endpoint);
      const data = await response.json();
      setBackendData(data);
    } catch (error) {
      console.log("Error fetching songs", error);
    }
  };

  const handleAddSong = async () => {
    try {
      if (
        !song_id ||
        !title ||
        !artist_id ||
        !album_id ||
        !genre ||
        !play_count ||
        !released_on
      ) {
        alert("Please fill in all the details");
        return;
      }

      const response = await fetch("/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_id,
          title,
          artist_id,
          album_id,
          genre,
          play_count,
          released_on,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add song. Please try again.");
      }

      const data = await response.json();
      setBackendData([...backendData, data]);
      setSongId(0);
      setTitle("");
      setArtistId(0);
      setAlbumId(0);
      setGenre("");
      setPlaycount(0);
      setReleasedOn("");
      fetchSongs();
    } catch (error) {
      console.error("Error while adding record:", error);

      alert("Invalid artist id or album id. Please try again");
    }
  };

  const playSong = async (song_id) => {
    try {
      const response = await fetch("/songs/play", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, song_id }),
      });
      setSongId("");
      fetchSongs();
    } catch (error) {
      console.log("ERROR while playing song", error);
    }
  };

  const toggleShowTop = () => {
    setShowTop((prevShowFull) => !prevShowFull);
  };

  return (
    <>
      <div className="container mb-3 d-flex justify-content-between">
        <div>
          <button
            className="btn btn-dark"
            onClick={handleAddSong}
            style={{
              height: "40px",
              marginTop: "6px",
              width: "115px",
              fontSize: "18px",
            }}
          >
            Add Song
          </button>
        </div>
        <button
          className="btn btn-dark "
          style={{
            height: "40px",
            marginTop: "6px",
            width: "115px",
            fontSize: "18px",
          }}
          onClick={toggleShowTop}
        >
          {showTop ? "Show All" : "Show top"}
        </button>
      </div>

      <div className="mb-5 d-flex">
        <div className="mx-1">
          <input
            type="Number"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            className="form-control"
            placeholder="song id"
            value={song_id}
            onChange={(e) => setSongId(e.target.value)}
          />
        </div>
        <div className="mx-1">
          <input
            type="text"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            className="form-control"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mx-1">
          <input
            type="Number"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            className="form-control"
            placeholder="artist_id"
            value={artist_id}
            onChange={(e) => setArtistId(e.target.value)}
          />
        </div>
        <div className="mx-1">
          <input
            type="Number"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            className="form-control"
            placeholder="album_id"
            value={album_id}
            onChange={(e) => setAlbumId(e.target.value)}
          />
        </div>
        <div className="mx-1">
          <input
            type="text"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            className="form-control"
            placeholder="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div className="mx-1">
          <input
            type="Number"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            step="0.01"
            className="form-control"
            placeholder="play count"
            value={play_count}
            onChange={(e) => setPlaycount(e.target.value)}
          />
        </div>
        <div className="mx-1">
          <input
            type="Date"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            step="0.01"
            className="form-control"
            placeholder="released on"
            value={released_on}
            onChange={(e) => setReleasedOn(e.target.value)}
          />
        </div>
      </div>
      <table
        className="table  table-striped table-dark table-hover"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        <thead className="thead-dark">
          <tr>
            <th>TITLE</th>
            <th>ARTIST ID</th>
            <th>ALBUM ID</th>
            <th>GENRE</th>
            <th>PLAY COUNT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {backendData.map((song) => (
            <tr key={song.song_id}>
              <td>{song.title}</td>
              <td>{song.artist_id}</td>
              <td>{song.album_id}</td>
              <td>{song.genre}</td>
              <td>{song.play_count}</td>
              <td>
                <button
                  className="btn btn-success"
                  style={
                    {
                      /*backgroundColor: "rgba(255, 255, 255, 0.5)"*/
                    }
                  }
                  onClick={() => playSong(song.song_id)}
                >
                  PLAY
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
