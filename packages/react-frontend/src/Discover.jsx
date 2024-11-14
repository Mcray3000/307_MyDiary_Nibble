// src/Discover.jsx
import React, { useState, useEffect } from "react";
import "./Discover.css";

function Discover() {
  const [entries, setEntries] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    // Fetch public entries from your backend API
    fetch("https://three07-mydiary-nibble.onrender.com/entries?is_public=True") // Adjust the endpoint as needed
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
    <div className="discover-page">
      {" "}
      {/* Add a container for styling */}
      <div className="top-bar">
        <div className="title-card">Public Scribbles</div>
      </div>
      <div className="card-title">General</div>{" "}
      {/* Title for all entry cards */}
      <div className="entries-grid">
        {entries.map((entry) => (
          <div key={entry._id || entry.title} className="entry-card">
            {" "}
            {/* Assuming your entries have an _id property */}
            <div className="entry-title">{entry.title}</div>
            <div className="entry-author">Author: {entry.author}</div>{" "}
            <div className="entry-date">Date: {formatDate(entry.date)}</div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;
