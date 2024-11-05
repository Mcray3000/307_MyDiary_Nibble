// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Form from "./Form.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DiaryEntry from "./DiaryEntry.jsx";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  const [message, setMessage] = useState(""); // Correctly defining message state

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => {
        setCharacters(json);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Failed to load characters."); // Set error message
      });
  }, []);

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function fetchUsers() {
    return fetch("http://localhost:8000/users"); // Fetch users
  }

  function updateList(person) {
    postUser(person)
      .then((res) => res.json())
      .then((newPerson) => {
        setCharacters((prev) => [...prev, newPerson]);
        setMessage("Character added successfully!"); // Set success message
      })
      .catch((error) => {
        console.log(error);
        setMessage("Failed to add character."); // Set error message
      });
  }

  function deleteUser(person) {
    return fetch(`http://localhost:8000/users/${person._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function removeOneCharacter(index) {
    const characterToDelete = characters[index];
    deleteUser(characterToDelete)
      .then(() => {
        setCharacters((prev) => prev.filter((_, i) => i !== index));
        setMessage("Character deleted successfully!"); // Set success message
      })
      .catch((error) => {
        console.log(error);
        setMessage("Failed to delete character."); // Set error message
      });
  }

  console.log("Characters in my app", characters);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/diary">Diary Entry</Link>
      </nav>
      <div className="container">
        {location.pathname === "/" && message && <p>{message}</p>}
        <Routes>
          <Route path="/" element={<Form handleSubmit={updateList} />} />
          <Route path="/diary" element={<DiaryEntry />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MyApp;
