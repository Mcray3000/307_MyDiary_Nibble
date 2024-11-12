// src/DiaryEntry.jsx
import React, { useState, useEffect } from "react";
import closedtrash from "./assets/ClosedTrash.svg";
import opentrash from "./assets/OpenTrash.svg";
import lock from "./assets/Lock.svg";
import unlock from "./assets/Unlock.svg";
import star from "./assets/Stared.svg";
import unstar from "./assets/Unstared.svg";
import send from "./assets/Send.svg";
import sent from "./assets/SendHover.svg";

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
        <input type="text" className="diary-title" placeholder="Insert title" />
        <span className="diary-private">(private)</span>
        <span className="diary-edit">Last edited on xx/xx/xxxx</span>
      </div>
      <form onSubmit={handleSubmit} className="diary-form">
        <textarea
          value={entry}
          onChange={handleChange}
          placeholder="Scribble here..."
          rows="10"
          cols="50"
          required
        />
        <div className="diary-toolbar">
          {/* <button type="button" className="diary-button">
            <img src="/path/to/pen-icon.svg" alt="Pen" />
          </button> */}
          <button type="button" className="diary-button">
            <img
              src={send}
              alt="Lock"
              onMouseOver={(e) => (e.currentTarget.src = sent)}
              onMouseOut={(e) => (e.currentTarget.src = send)}
            />
          </button>
          {/* ... add other toolbar buttons ... */}
        </div>
        <div className="diary-footer">
          <button type="button" className="form-button">
            Save
          </button>
          <button type="button" className="diary-button">
            <img
              src={lock}
              alt="Lock"
              onMouseOver={(e) => (e.currentTarget.src = unlock)}
              onMouseOut={(e) => (e.currentTarget.src = lock)}
            />
          </button>
          <button type="button" className="diary-button">
            <img
              src={unstar}
              alt="Lock"
              onMouseOver={(e) => (e.currentTarget.src = star)}
              onMouseOut={(e) => (e.currentTarget.src = unstar)}
            />
          </button>
          <button type="button" className="diary-button">
            <img
              src={closedtrash}
              alt="Trash"
              onMouseOver={(e) => (e.currentTarget.src = opentrash)}
              onMouseOut={(e) => (e.currentTarget.src = closedtrash)}
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default DiaryEntry;
