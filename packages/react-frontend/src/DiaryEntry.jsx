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
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(true); // Initially private
  const [isFavorite, setIsFavorite] = useState(false);

  const handleChange = (e) => {
    setEntry(e.target.value); // Update state with the value from the textarea
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    // Prepare the diary entry object
    const diaryEntry = {
      title: title,
      content: entry,
      private: isPrivate,
      favorite: isFavorite,
      // Add other properties like date, user ID, etc. as needed
    };

    // Send the diary entry to your backend API
    fetch("http://localhost:8000/diaryEntries", {
      // Replace with your actual API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diaryEntry),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save scribble.");
        }
        console.log("Scribble saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving scribble:", error);
        // Handle the error (e.g., show an error message)
      });
  };

  const handleTrash = () => {
    setEntry("");
    setTitle("");
  };

  const handleLock = () => {
    setIsPrivate(!isPrivate);
  };

  const handleStar = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="diary-container">
      <div className="diary-header">
        <input
          type="text"
          className="diary-title"
          placeholder="Insert title"
          value={title}
          onChange={handleTitleChange}
        />
        <span className="diary-private">
          ({isPrivate ? "private" : "public"})
        </span>
        <span className="diary-edit">Last edited on xx/xx/xxxx</span>{" "}
        {/* Update with actual date/time */}
      </div>
      <form className="diary-form">
        {" "}
        {/* No need for onSubmit here */}
        <textarea
          value={entry}
          onChange={handleChange}
          placeholder="Scribble here..."
          rows="10"
          cols="50"
          required
        />
        {/* ... your toolbar ... */}
        <div className="diary-footer">
          <button type="button" className="form-button" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="diary-button" onClick={handleLock}>
            <img
              src={isPrivate ? lock : unlock}
              alt="Lock"
              onMouseOver={(e) => (e.currentTarget.src = unlock)}
              onMouseOut={(e) => (e.currentTarget.src = lock)}
            />
          </button>
          <button type="button" className="diary-button" onClick={handleStar}>
            <img
              src={isFavorite ? star : unstar}
              alt="Star"
              onMouseOver={(e) => (e.currentTarget.src = star)}
              onMouseOut={(e) => (e.currentTarget.src = unstar)}
            />
          </button>
          <button type="button" className="diary-button" onClick={handleTrash}>
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
