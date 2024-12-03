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

  function addAuthHeader(otherHeaders = {}) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === "") {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      };
    }
  }

  function postUser(person) {
    console.log(JSON.stringify(person));
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function checkUserLogin(person) {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
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
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/users?name=${name}`);
  }

  async function handleCreateUser(person) {
    const res = await postUser(person);
    if (!res.ok) {
      // Handle error based on response status or returned JSON
      if (res.status === 403) {
        throw new Error("Username already exists.");
      } else {
        throw new Error("Failed to create user.");
      }
    }
    return true;
  }

  async function handleLogin(person) {
    const res = await checkUserLogin(person);
    if (!res.ok) {
      if (res.status == 401) {
        throw new Error("Invalid username or password.");
      }
      else {
        throw new Error("Some error happened. Please try again.");
      }
    }
    return await res.json();
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/create"
            element={<CreateUser handleSubmit={handleCreateUser} />}
          />
          <Route path="/main" element={<MainPage addAuth={addAuthHeader} />} />
          <Route path="/diary" element={<DiaryEntry />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/discover" element={<Discover />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MyApp;
