// src/MainPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [entries, setEntries] = useState([
    {
      _id: "1", // You can use any unique identifier here
      title: "Your First Scribble",
      author: "You", // Replace with your name or a username
      date: "2024-11-13T12:00:00.000Z", // Example date
    },
    // Add more entries as needed
  ]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    // Fetch previous entries from backend
    fetch("http://localhost:8000/entries")
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
              <div className="entry-author">Author: {entry.author}</div>
              <div className="entry-date">{formatDate(entry.date)}</div>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
