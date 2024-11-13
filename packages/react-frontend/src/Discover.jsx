// src/Discover.jsx
import React, { useState, useEffect } from "react";

function Discover() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch public entries from your backend API
    fetch("http://localhost:8000/diaryEntries?private=false") // Adjust the endpoint as needed
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch public entries.");
        }
        return res.json();
      })
      .then((data) => {
        setEntries(data);
      })
      .catch((error) => {
        console.error("Error fetching entries:", error);
        // Handle the error (e.g., show an error message)
      });
  }, []);

  return (
    <div className="discover-page">
      {" "}
      {/* Add a container for styling */}
      <div className="top-bar">
        <div className="title-card">Public Scribbles</div>
      </div>
      <div className="entries-grid">
        {entries.map((entry) => (
          <div key={entry._id} className="entry-card">
            {" "}
            {/* Assuming your entries have an _id property */}
            <div className="entry-title">{entry.title}</div>
            <div className="entry-author">Author: {entry.author}</div>{" "}
            <div className="entry-date">Date: {entry.date}</div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;
