// src/MainPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

function MainPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [entries, setEntries] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    // Fetch previous entries from backend
    // ${username}
    fetch(`${import.meta.env.VITE_BACKEND_URL}/entries`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch entries.");
        }
        return res.json();
      })
      .then((data) => {
        setEntries(data);
      })
      .catch((error) => {
        console.error("Error fetching entries:", error);
      });
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric", // "yyyy"
      month: "long", // "Month"
      day: "numeric", // "dd"
    });
  };
  // for (let i = 0; i < localStorage.length; i++) {
  //   let key = localStorage.key(i);
  //   console.log(`${key}: ${localStorage.getItem(key)}`);
  // }

  return (
    <div className="main-page">
      <HamburgerMenu />
      <div className="top-bar">
        <div className="title-card">Nibble and Scribble</div>
      </div>
      <div className="date">Today's Date: {currentDate}</div>
      <Link to="/diary" className="create-button">
        Create New Entry
      </Link>

      <div className="entries-section">
        <h3>My Previous Entries:</h3>
        <div className="entries-grid">
          {/* Map through the 'entries' state to display previous entries */}
          {entries.map((entry, index) => (
            <Link
              key={entry.entry_id}
              to={`/edit/${entry.entry_id}`}
              className="entry-card"
            >
              <div className="entry-title">{entry.title}</div>{" "}
              <div className="entry-date">
                Published: {" " + formatDate(entry.publish_date)}
              </div>{" "}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
