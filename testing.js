//server.js

import express from "express";
import {
  getNote,
  getNotes,
  createNote,
  getNotesDesc,
  getNotesTop,
  getNotesDescTop,
} from "./database.js";
import { addBook, getBooks, readBook, topBooks } from "./bookdata.js";
import { createuser, getUserByUsernameAndPassword } from "./logindata.js";
import {
  addSong,
  getSongs,
  getSongByGenre,
  topSongs,
  playSong,
} from "./songdata.js";

const app = express();
app.use(express.json());

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

app.get("/notes/desc", async (req, res) => {
  const notes = await getNotesDesc();
  res.send(notes);
});

app.get("/notes/top", async (req, res) => {
  const notes = await getNotesTop();
  res.send(notes);
});

app.get("/notes/topdesc", async (req, res) => {
  const notes = await getNotesDescTop();
  res.send(notes);
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const title = req.query.title || "";
  const note = await getNote(id, title);
  res.send(note);
});

app.get("/books", async (req, res) => {
  const books = await getBooks();
  res.send(books);
});

app.get("/books/top", async (req, res) => {
  const top_books = await topBooks();
  res.send(top_books);
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  res.status(201).send(note);
});

app.post("/books", async (req, res) => {
  const { ISBN, title, author, price, rating } = req.body;
  const book = await addBook(ISBN, title, author, price, rating);
  res.status(201).send(book);
});

app.post("/books/read", async (req, res) => {
  const { ISBN } = req.body;
  const book_read = await readBook(ISBN);
  res.status(201).send(book_read);
});

//user login requests
app.post("/registerpage", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Call the createuser function to insert the user into the database
    await createuser(username, email, password);

    // If insertion is successful, send a success response
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    // If an error occurs during insertion, send an error response
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if username and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    // Query the database using the getUserByUsernameAndPassword function
    const results = await getUserByUsernameAndPassword(email, password);

    // If user is found, return success response
    if (results.length > 0) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      // If user is not found or password is incorrect, return error response
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

//books.js

import React, { useEffect, useState } from "react";

export default function Books() {
  const [backendData, setBackendData] = useState([]);
  const [ISBN, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [showTop]);

  const fetchBooks = async () => {
    try {
      const endpoint = showTop ? "/books/top" : "/books";
      const response = await fetch(endpoint);
      const data = await response.json();
      setBackendData(data);
    } catch (error) {
      console.log("Error fetching books", error);
    }
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch("/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ISBN, title, author, price, rating }),
      });
      const data = await response.json();
      setBackendData([...backendData, data]);
      setISBN("");
      setTitle("");
      setAuthor("");
      setPrice(0);
      setRating(0);
      fetchBooks();
    } catch (error) {
      console.log("ERROR while adding record", error);
    }
  };

  const readBook = async (ISBN) => {
    try {
      const response = await fetch("/books/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ISBN }),
      });
      
      setISBN("");
      fetchBooks();
    } catch (error) {
      console.log("ERROR while reading book", error);
    }
  };

  const toggleShowTop = () => {
    setShowTop((prevShowFull) => !prevShowFull);
  };

  return (
    <>
      <div className="container mb-3 d-flex justify-content-between">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
        <button
          className="btn btn-dark "
          style={{
            height: "40px",
            marginTop: "6px",
          }}
          onClick={toggleShowTop}
        >
          {showTop ? "Show All" : "Show top"}
        </button>
      </div>

      <div className="mb-5 d-flex">
        <div className="mx-1">
          <input
            type="text"
            className="form-control"
            placeholder="ISBN"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
          />
        </div>
        <div className="mx-1">
          <input
            type="text"
            className="form-control"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mx-1">
          <input
            type="text"
            className="form-control"
            placeholder="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mx-1">
          <input
            type="Number"
            step="0.01"
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mx-1">
          <input
            type="Number"
            step="0.01"
            className="form-control"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-dark" onClick={handleAddBook}>
            Add
          </button>
        </div>
      </div>
      <table className="table table-bordered table-striped table-dark table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ISBN</th>
            <th>TITLE</th>
            <th>AUTHOR</th>
            <th>PRICE</th>
            <th>RATING</th>
            <th>COUNT</th>
          </tr>
        </thead>
        <tbody>
          {backendData.map((book) => (
            <tr key={book.ISBN}>
              <td>{book.ISBN}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.rating}</td>
              <td>{book.read_count}</td>
              <td>
                <button
                  className="btn btn-light"
                  onClick={() => readBook(book.ISBN)}
                >
                  READ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

//notes.js
import React, { useEffect, useState } from "react";

export default function Notes() {
  const [backendData, setBackendData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [showFull]);

  const fetchNotes = async () => {
    try {
      const endpoint = showFull ? "/notes" : "/notes/top";
      const response = await fetch(endpoint);
      const data = await response.json();
      setBackendData(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) {
      setSearchResults(backendData); // If search query is empty, display all data
    } else {
      const results = backendData.filter((note) => {
        return (
          note.id.toString().includes(searchQuery) ||
          note.title.includes(searchQuery)
        );
      });
      setSearchResults(results);
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await fetch("/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, contents }),
      });
      const data = await response.json();
      setBackendData([...backendData, data]);
      setTitle("");
      setContents("");
      fetchNotes(); // Call fetchNotes to regenerate the table
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const toggleShowFull = () => {
    // Use functional update to ensure the latest state value is used
    setShowFull((prevShowFull) => !prevShowFull);
  };

  return (
    <>
      <div className="mb-3 d-flex justify-content-between">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID or Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Contents"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary mb-3" onClick={handleAddNote}>
        Add Note
      </button>

      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Contents</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.title}</td>
              <td>{note.contents}</td>
              <td>{note.created}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary mb-3" onClick={toggleShowFull}>
        {showFull ? "Show Top" : "Show Full"}
      </button>
    </>
  );
}
