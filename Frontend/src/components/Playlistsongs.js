import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Playlistsongs() {
  const { playlist_id } = useParams();
  const [backendData, setBackendData] = useState([]);
  const [playlistData, setPlaylistData] = useState({});
  const [allSongs, setAllSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState("");

  useEffect(() => {
    fetchPlaylistSongs();
    fetchPlaylistDetails();
    fetchAllSongs();
  }, [playlist_id]);

  const fetchPlaylistSongs = async () => {
    try {
      const endpoint = `/playlist/${playlist_id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setBackendData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaylistDetails = async () => {
    try {
      const endpoint = `/playlistData/${playlist_id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setPlaylistData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllSongs = async () => {
    try {
      const endpoint = `/songs`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setAllSongs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSong = async () => {
    try {
      const response = await fetch(
        `/addSongToPlaylist/${playlist_id}/${selectedSong}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playlist_id, song_id: selectedSong }),
        }
      );
      if (response.ok) {
        fetchPlaylistSongs();
      } else {
        throw new Error("Failed to add song to playlist");
      }
    } catch (error) {
      console.error(error);
      alert("Song is already in the playlist");
    }
  };

  const handleRemoveSongsFromPlaylist = async (songId) => {
    try {
      const response = await fetch(
        `/deleteSongFromPlaylist/${playlist_id}/${songId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playlist_id, song_id: songId }),
        }
      );
      if (response.ok) {
        fetchPlaylistSongs();
      } else {
        throw new Error("Failed to remove song from playlist");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to remove song from playlist. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <div
          className="container d-flex flex-row"
          style={{
            marginTop: "20px",
            backgroundColor: "black",
            marginLeft: "1px",
            marginRight: "29px",
            maxHeight: "400px",
          }}
        >
          <div className="container">
            <img
              src={playlistData[0]?.image}
              alt="Playlist"
              className="img-fluid"
              style={{
                borderRadius: "3px",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "20px ",
                marginLeft: "-10px",
                position: "relative",
                zIndex: 10,
              }}
            />
          </div>
          <div
            className="container"
            style={{ color: "white", marginTop: "140px" }}
          >
            <div style={{ fontSize: "50px" }}>
              {playlistData[0]?.playlist_name}
            </div>
            <div className="d-flex flex-row">
              <div style={{ marginRight: "6px" }}>
                {playlistData[0]?.number_of_songs} songs &#x2022;
              </div>
              <div>created on : {playlistData[0]?.created_on}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="d-flex justify-content-end mb-3">
          <select
            className="form-select me-2"
            aria-label="Select Song"
            value={selectedSong}
            onChange={(e) => setSelectedSong(e.target.value)}
          >
            <option value="">Select Song</option>
            {allSongs.map((song) => (
              <option key={song.song_id} value={song.song_id}>
                {song.title}
              </option>
            ))}
          </select>
          <button className="btn btn-success" onClick={handleAddSong}>
            Add Song
          </button>
        </div>
        <table className="table table-bordered table-striped table-dark table-hover">
          <thead className="thead-dark">
            <tr>
              <th>TITLE</th>
              <th>ARTIST</th>
              <th>ALBUM</th>
              <th>GENRE</th>
              <th>PLAY COUNT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {backendData.map((playlistSong) => (
              <tr key={playlistSong.song_id}>
                <td>{playlistSong.song_title}</td>
                <td>{playlistSong.artist_name}</td>
                <td>{playlistSong.album_title}</td>
                <td>{playlistSong.genre}</td>
                <td>{playlistSong.play_count}</td>
                <td>
                  <button
                    className="btn btn-danger "
                    type="button"
                    onClick={() =>
                      handleRemoveSongsFromPlaylist(playlistSong.song_id)
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
