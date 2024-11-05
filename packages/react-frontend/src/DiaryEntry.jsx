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
    <div>
      <h2>Diary Entry</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={handleChange}
          placeholder="Write your diary entry here..."
          rows="10"
          cols="50"
          required
        />
        <br />
        <button type="submit">Submit Entry</button>
      </form>
    </div>
  );
}

export default DiaryEntry;
