// src/DiaryEntry.jsx
import React, { useState, useEffect } from "react";

function DiaryEntry() {
  const [entry, setEntry] = useState(""); // State to hold the diary entry text

  const handleChange = (e) => {
    setEntry(e.target.value); // Update state with the value from the textarea
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Diary Entry Submitted:", entry); // Handle the diary entry submission (log to console)
    // You can add functionality to save the entry or send it to an API here
    setEntry(""); // Clear the textarea after submission
  };

  return (
    <div className="diary-container">
      {" "}
      {/* Add a container */}
      <div className="diary-header">
        <input type="text" className="diary-title" placeholder="Title" />
        <span className="diary-private">(private)</span>
        <span className="diary-edit">Last edited on xx/xx/xxxx</span>
      </div>
      <form onSubmit={handleSubmit} className="diary-form">
        <textarea
          value={entry}
          onChange={handleChange}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum dictum metus, at cursus velit finibus non. Maecenas bibendum, ipsum vitae rhoncus efficitur..."
          rows="10"
          cols="50"
          required
        />
        <div className="diary-toolbar">
          <button type="button" className="round-button">
            <img src="/path/to/pen-icon.svg" alt="Pen" />
          </button>
          <button type="button" className="round-button">
            <img src="/path/to/image-icon.svg" alt="Image" />
          </button>
          {/* ... add other toolbar buttons ... */}
        </div>
        <div className="diary-footer">
          <button type="button" className="round-button">
            publish
          </button>
          <button type="button" className="round-button">
            <img src="/path/to/lock-icon.svg" alt="Lock" />
          </button>
          <button type="button" className="round-button">
            <img src="/path/to/star-icon.svg" alt="Star" />
          </button>
          <button type="button" className="round-button">
            <img src="/path/to/undo-icon.svg" alt="Undo" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default DiaryEntry;
