import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user_id }) {
  return (
    <>
      <nav
        className="navbar  sticky-top"
        style={{
          backgroundColor: "#06191D",
          zIndex: "300",
        }}
      >
        <div className="container-fluid" style={{ backgroundColor: "black" }}>
          <a
            className="navbar-brand"
            style={{ fontSize: "30px", color: "white" }}
          >
            Song Library
          </a>

          <div className="dropdown d-flex">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                alt="hugenerd"
                width="30"
                height="30"
                className="rounded-circle"
              />
              <span className="d-none d-sm-inline mx-1">{user_id}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to={`/homepage/${user_id}/profile`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/login">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
