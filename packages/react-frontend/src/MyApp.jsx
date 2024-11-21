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
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function checkUserLogin(person) {
    return fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: person.name,
        password: person.password
      }),
    })
  }

  function fetchUserByName(name) {
    return fetch(`http://localhost:8000/users?name=${name}`);
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
    return checkUserLogin(person).then((res) => {
      if (!res.ok) {
        if (res.status == 401) {
          throw new Error("Invalid username or password.");
        }
        else {
          console.log(res);
          throw new Error("Some error happened. Please try again.");
        }
      }
      return res.json();
    });
  }

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
