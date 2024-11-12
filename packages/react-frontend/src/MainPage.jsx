// src/MainPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [entries, setEntries] = useState([]); // Placeholder for entries

  useEffect(() => {
    // Get the current date in your desired format (e.g., MM/DD/YYYY)
    const today = new Date();
    const formattedDate = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    // TODO: Fetch previous entries from your data source (e.g., an API)
    // and update the 'entries' state.
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
