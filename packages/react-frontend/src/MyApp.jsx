// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import DiaryEntry from "./DiaryEntry.jsx";
import Calendar from "./Calendar.jsx";
import Login from "./Login.jsx";
import CreateUser from "./CreateUser.jsx";
import HamburgerMenu from "./HamburgerMenu.jsx";
import MainPage from "./MainPage.jsx";
import Discover from "./Discover.jsx";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function fetchUserByName(name) {
    return fetch(`http://localhost:8000/users?name=${name}`);
  }

  function handleCreateUser(person) {
    // Check if username already exists (replace with your actual logic)
    return fetchUserByName(person.name)
      .then((res) => res.json())
      .then((users) => {
        if (users.some((user) => user.name === person.name)) {
          throw new Error("Username already exists.");
        }
        return postUser(person); // Create the user if the username is unique
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create user.");
        }
        return res.json();
      });
  }

  function handleLogin(person) {
    return fetchUserByName(person.name)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((users) => {
        // Basic authentication check (insecure, use hashing in production)
        const user = users.find(
          (user) =>
            user.name === person.name && user.password === person.password
        );
        if (!user) {
          throw new Error("Invalid username or password");
        }
        // You might want to store user data in local storage or context API here
        return true; // Indicate successful login
      });
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

  console.log("Characters in my app", characters);

  return (
    <Router>
      <HamburgerMenu />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/create"
            element={<CreateUser handleSubmit={handleCreateUser} />}
          />
          <Route path="/main" element={<MainPage />} />
          <Route path="/diary" element={<DiaryEntry />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/discover" element={<Discover />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MyApp;
