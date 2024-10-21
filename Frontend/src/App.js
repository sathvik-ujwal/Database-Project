import { useState } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Loginpage from "./components/Loginpage";
import Registerpage from "./components/Registerpage";
import Songs from "./components/Songs";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import { UserProvider } from "./components/Usercontext";
import Playlistsongs from "./components/Playlistsongs";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />

          <Route path="/homepage/:user_id" element={<Homepage />}>
            <Route path="songs" element={<Songs />} />
            <Route path="search" element={<Search />} />
            <Route path="playlists" element={<Playlist />} />
            <Route path="playlists/:playlist_id" element={<Playlistsongs />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

function Homepage() {
  const { user_id } = useParams();
  return (
    <>
      <Navbar title="Song Library" user_id={user_id} />
      <div className="container-fluid">
        <div className="row">
          <Sidebar user_id={user_id} />
          <div
            className="col-md-9 col-xl-10"
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="background-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",

                //backgroundImage: `url("https://images.dailyhive.com/20211110075941/music_on_repeat.jpg")`,
                //backgroundImage: `url("https://www.rrfedu.com/blog/wp-content/uploads/2018/02/listening-to-music-like-a-pro.jpg`,
                //backgroundImage: `url("https://wallpaper-house.com/data/out/5/wallpaper2you_59853.png")`,
                //backgroundImage: `url("https://c0.wallpaperflare.com/preview/551/758/576/earphones-music-listen.jpg")`,
                backgroundImage: `url("https://www.rrfedu.com/blog/wp-content/uploads/2018/02/listening-to-music-like-a-pro.jpg")`,
                //backgroundImage: `url("https://img.freepik.com/premium-photo/headphones-different-types-flat-lay-green-color-background-copy-space_151851-3.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1712188800&semt=ais")`,
                //backgroundColor: "#fdb02d",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                opacity: 0.9,
                zIndex: -1,
              }}
            />

            <div className="container">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
