import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { user_id } = useParams();
  const [backendData, setBackendData] = useState([]);
  const [recentData, setrecentData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchUserdata();
    fetchRecentdata();
    fetchFollowersData();
    fetchFollowingData();
  }, [user_id]);

  const fetchUserdata = async () => {
    try {
      console.log(user_id);
      const endpoint = `/profile/${user_id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
      setBackendData(data);
    } catch (error) {
      console.log("Error fetching playlists", error);
    }
  };

  const fetchRecentdata = async () => {
    try {
      console.log(user_id);
      const endpoint = `/recentSongs/${user_id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
      setrecentData(data);
    } catch (error) {
      console.log("Error fetching playlists", error);
    }
  };

  const fetchFollowersData = async () => {
    try {
      console.log(user_id);
      const endpoint = `/followers/${user_id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
      setFollowersData(data);
    } catch (error) {
      console.log("Error fetching playlists", error);
    }
  };

  const fetchFollowingData = async () => {
    try {
      console.log(user_id);
      const endpoint = `/following/${user_id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
      setFollowingData(data);
    } catch (error) {
      console.log("Error fetching playlists", error);
    }
  };

  const handleEditButtonClick = () => {
    setNewUsername(backendData[0]?.username || "");
    setNewEmail(backendData[0]?.email || "");
    setNewPassword(backendData[0]?.password || "");
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/profile/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUsername,
          newEmail,
          newPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setShowEditModal(false);
        fetchUserdata();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  return (
    <>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: 200 }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: 150 }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: 150, zIndex: 1 }}
                    />
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-dark"
                      data-mdb-ripple-color="dark"
                      style={{ zIndex: 1 }}
                      onClick={handleEditButtonClick}
                    >
                      Edit profile
                    </button>
                  </div>
                  <div className="ms-3" style={{ marginTop: 130 }}>
                    {backendData.length > 0 && (
                      <>
                        <h5>{backendData[0].username}</h5>
                      </>
                    )}
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">4</p>
                      <p className="small text-muted mb-0">Playlists</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">2</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">4</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    {backendData.length > 0 && backendData[0] && (
                      <>
                        <p className="font-italic mb-1">
                          Email: {backendData[0].email}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="d-flex align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={{ marginRight: "310px" }}
                    >
                      Followers
                    </p>
                    <p className="lead fw-normal mb-0">Following</p>
                  </div>
                  <div className="d-flex  align-items-center mb-4">
                    <div className="row g-2" style={{ marginRight: "263px" }}>
                      {followersData.length > 0 &&
                        followersData.map((follower) => (
                          <div key={follower.user_id}>
                            <span className="text-muted">
                              {follower.followers}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="row g-2">
                      {followingData.length > 0 &&
                        followingData.map((following) => (
                          <div key={following.user_id}>
                            <span className="text-muted">
                              {following.following}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recently played songs</p>
                  </div>
                  <div className="row g-2">
                    <table className="table table-bordered table-striped table-dark table-hover">
                      <thead className="thead-dark">
                        <tr>
                          <th>SONG</th>
                          <th>PlAYED_ON</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentData.map((playlist) => (
                          <tr key={playlist.played_at}>
                            <td>{playlist.title}</td>
                            <td>{playlist.played_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showEditModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", marginTop: "10px" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowEditModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label htmlFor="newUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newUsername"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="newEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="newEmail"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="newPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleSaveChanges}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
