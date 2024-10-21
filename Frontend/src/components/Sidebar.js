import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

export default function Sidebar({ user_id }) {
  //const { user_id } = useState;
  const [backendData, setBackendData] = useState([]);
  //const { user_id } = useParams();

  useEffect(() => {
    fetchPlaylists();
  }, [user_id]);

  const fetchPlaylists = async () => {
    try {
      console.log(user_id);
      const endpoint = `/playlists/${user_id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setBackendData(data);
    } catch (error) {
      console.log("Error fetching playlists", error);
    }
  };

  return (
    <div
      className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
      style={{ backgroundColor: "black" }}
    >
      <div
        className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 "
        style={{
          backgroundColor: "black",
          borderRadius: "20px",
          height: "100%",
          zIndex: "2",
        }}
      >
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
          style={{
            color: "green",
          }}
        >
          <li className="nav-item">
            <Link
              to={`/homepage/${user_id}/songs`}
              className="nav-link align-middle px-0"
            >
              <i className="fs-4 bi-house"></i>{" "}
              <span
                className="ms-1 d-none d-sm-inline"
                style={{
                  fontSize: "22px",
                  color: "white",
                }}
              >
                Library
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/homepage/${user_id}/search`}
              className="nav-link align-middle px-0 "
            >
              <i className="fs-4 bi-house"></i>{" "}
              <span
                className="ms-1 d-none d-sm-inline"
                style={{
                  fontSize: "22px",
                  color: "white",
                }}
              >
                search
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/homepage/${user_id}/playlists`}
              className="nav-link align-middle px-0"
            >
              <i className="fs-4 bi-house"></i>{" "}
              <span
                className="ms-1 d-none d-sm-inline"
                style={{
                  fontSize: "22px",
                  color: "white",
                }}
              >
                Playlists
              </span>
            </Link>
          </li>
          {backendData.map((playlist) => (
            <li key={playlist.playlist_id} className="nav-item">
              <Link
                to={`/homepage/${user_id}/playlists/${playlist.playlist_id}`}
                className="nav-link align-middle px-0"
              >
                <div
                  className="d-flex flex-row align-items-center"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="mr-2"
                    style={{ width: "45px", height: "35px" }}
                  >
                    <img
                      src={playlist.image}
                      alt="Playlist"
                      className="img-fluid"
                      style={{
                        borderRadius: "3px",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="ms-1 d-flex flex-column">
                    <div
                      className="font-weight-bold"
                      style={{
                        fontSize: "16px",
                        color: "white",
                        textDecoration: "none",
                      }}
                    >
                      {playlist.playlist_name}
                    </div>
                    <div style={{ fontSize: "14px", color: "white" }}>
                      {playlist.number_of_songs} songs
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
      </div>
    </div>
  );
}
