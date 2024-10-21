import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Playlist() {
  const [backendData, setBackendData] = useState([]);
  const [playlist_name, setPlaylistName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user_id } = useParams();

  useEffect(() => {
    fetchPlaylists();
  }, []); // Add an empty dependency array to fetch playlists only once when component mounts

  const fetchPlaylists = async () => {
    try {
      const endpoint = `/playlists/${user_id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setBackendData(data);
    } catch (error) {
      console.log("Error fetching playlists", error);
    }
  };

  const handleCreateButtonClick = () => {
    setShowCreateForm(true);
  };

  const handleCreatePlaylist = async () => {
    try {
      const response = await fetch("/createPlaylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          playlist_name,
        }),
      });
      if (response.ok) {
        // Playlist created successfully, fetch updated playlists
        fetchPlaylists();
        setShowCreateForm(false);
        window.location.reload();
      } else {
        console.error("Failed to create playlist");
      }
    } catch (error) {
      console.error("Error creating playlist", error);
    }
  };

  const handleDeletePlaylist = async (playlist_id) => {
    try {
      const response = await fetch(`/deletePlaylist/${playlist_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlist_id }),
      });
      if (response.ok) {
        fetchPlaylists();
        window.location.reload();
      } else {
        throw new Error("Failed to delete playlist");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to remove song from playlist. Please try again.");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div>
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={handleCreateButtonClick}
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              width: "160px",
              height: "50px",
              fontSize: "20px",
            }}
          >
            Create Playlist
          </button>
        </div>
        <div>
          <table className="table table-bordered table-striped table-dark table-hover">
            <thead className="thead-dark">
              <tr>
                <th>PLAYLIST_ID</th>
                <th>PLAYLIST_NAME</th>
                <th>CREATED_ON</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {backendData.map((playlist) => (
                <tr key={playlist.playlist_id}>
                  <td>{playlist.playlist_id}</td>
                  <td>{playlist.playlist_name}</td>
                  <td>{playlist.created_on}</td>
                  <th>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleDeletePlaylist(playlist.playlist_id)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateForm && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", marginTop: "500px", marginLeft: "150px" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Playlist</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowCreateForm(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label htmlFor="playlistName">Playlist Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="playlistName"
                    value={playlist_name}
                    onChange={(e) => setPlaylistName(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowCreateForm(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleCreatePlaylist}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
