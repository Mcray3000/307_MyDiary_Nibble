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
    console.log(JSON.stringify(person));
    return fetch("https://three07-mydiary-nibble.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function fetchUserByName(name) {
    return fetch(`https://three07-mydiary-nibble.onrender.com/users?name=${name}`);
  }

  function handleCreateUser(person) {
    return postUser(person).then((res) => {
      if (!res.ok) {
        // Handle error based on response status or returned JSON
        if (res.status === 403) {
          throw new Error("Username already exists.");
        } else {
          throw new Error("Failed to create user.");
        }
      }
      // No need to parse JSON here since the response is a simple message
      return true; // Indicate successful user creation
    });
  }

  function handleLogin(person) {
    return fetchUserByName(person.name).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });
  }

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
