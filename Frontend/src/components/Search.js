import React, { useState, useEffect } from "react";

export default function Search() {
  const [backendData, setBackendData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("song");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch("/searchSongs");
      const data = await response.json();
      setBackendData(data);
    } catch (error) {
      console.log("Error fetching songs", error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) {
      setSearchResults(backendData);
    } else {
      const results = backendData.filter((song) => {
        const lowercaseQuery = searchQuery.toLowerCase();
        switch (searchType) {
          case "song":
            return song.song_title.toLowerCase().startsWith(lowercaseQuery);
          case "artist":
            return song.artist_name.toLowerCase().startsWith(lowercaseQuery);
          case "genre":
            return song.genre.toLowerCase().startsWith(lowercaseQuery);
          default:
            return false;
        }
      });
      setSearchResults(results);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ padding: "0px 13px" }}
      >
        <div className="dropdown">
          <select
            className="btn btn-secondary"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              height: "48px",
              color: "#414447",
              fontSize: "21px",
              borderRadius: "9px",
              borderColor: "white",
              width: "130px",
            }}
          >
            <option value="song" style={{ backgroundColor: "red" }}>
              Song
            </option>
            <option value="artist">Artist</option>
            <option value="genre">Genre</option>
          </select>
        </div>
        <div className="form-group" style={{ width: "800px" }}>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder={`Search songs by ${searchType}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
          />
        </div>
        <button
          className="btn btn-dark btn-lg"
          onClick={handleSearch}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "200px",
            height: "53px",
          }}
        >
          Search
        </button>
      </div>
      <div className="container mt-3">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((song) => (
              <tr key={song.song_id}>
                <td>{song.song_title}</td>
                <td>{song.artist_name}</td>
                <td>{song.album_title}</td>
                <td>{song.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
