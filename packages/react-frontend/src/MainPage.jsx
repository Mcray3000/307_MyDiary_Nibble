// src/MainPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    // Fetch previous entries from backend
    fetch("http://localhost:8000/diaryEntries")
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

  return (
    <div className="main-page">
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
            <div key={index} className="entry-card">
              <div className="entry-title">{entry.title}</div>{" "}
              {/* Assuming your entry object has a 'title' property */}
              <div className="entry-date">{entry.date}</div>{" "}
              {/* Assuming your entry object has a 'date' property */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
