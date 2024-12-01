// src/EditEntry.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import closedtrash from "./assets/ClosedTrash.svg";
import opentrash from "./assets/OpenTrash.svg";
import lock from "./assets/Lock.svg";
import unlock from "./assets/Unlock.svg";
import star from "./assets/Stared.svg";
import unstar from "./assets/Unstared.svg";
import send from "./assets/Send.svg";
import sent from "./assets/SendHover.svg";
import save from "./assets/Save.svg";
import savehover from "./assets/SaveHover.svg";
import HamburgerMenu from "./HamburgerMenu";

function EditEntry() {
  const { id } = useParams(); // Get the entry ID from the URL
  const navigate = useNavigate(); // For redirecting after saving
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lastEdited, setLastEdited] = useState(null);

  useEffect(() => {
    // Fetch the entry to edit using the ID
    fetch(`${import.meta.env.VITE_BACKEND_URL}/entries/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch entry.");
        }
        return res.json();
      })
      .then((data) => {
        // Assuming your API returns an object with title, entry, etc.
        console.log("API response is not in the expected format:", data);
        setTitle(data[0].title);
        setEntry(data[0].entry);
        setIsPrivate(data[0].is_public === "false"); // Adjust based on your API response
      })
      .catch((error) => {
        console.error("Error fetching entry:", error);
      });
  }, [id]); // Run this effect whenever the 'id' changes

  useEffect(() => {
    const updateLastEdited = () => {
      const now = new Date();
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedTime = now.toLocaleString("en-US", options);
      setLastEdited(formattedTime);
    };

    updateLastEdited();

    const inputFields = document.querySelectorAll(".diary-title, textarea");
    inputFields.forEach((input) => {
      input.addEventListener("input", updateLastEdited);
    });

    return () => {
      inputFields.forEach((input) => {
        input.removeEventListener("input", updateLastEdited);
      });
    };
  }, []);

  const handleChange = (e) => {
    setEntry(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    if (title.trim().length < 2 || entry.trim().length < 2) {
      alert("Please enter a title and text with at least 2 characters.");
      return;
    }

    const updatedEntry = {
      user_id: 96, // Replace with actual user ID
      title,
      entry,
      is_public: isPrivate ? "false" : "true",
      status: isPrivate ? "draft" : "published",
    };

    // Send the updated entry to your backend API (PUT request)
    fetch(`${import.meta.env.VITE_BACKEND_URL}/entries/${id}`, {
      // Use the ID in the URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEntry),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update entry.");
        }
        // Redirect to the main page or the updated entry's page
        navigate("/main");
      })
      .catch((error) => {
        console.error("Error updating entry:", error);
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
    <div>
      <HamburgerMenu />
      <div className="diary-container">
        {/* ... (rest of your component, similar to DiaryEntry) ... */}
        <div className="diary-header">
          <input
            type="text"
            className="diary-title"
            placeholder="Insert title"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="diary-status">
            <span
              className={`diary-private ${isPrivate ? "private" : "public"}`}
            >
              {isPrivate ? "Private" : "Public"}
            </span>
            <span className="diary-edit">
              Last edited {lastEdited ? lastEdited : "xx/xx/xxxx"}
            </span>
          </div>
        </div>
        <form className="diary-form">
          {" "}
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
            <button type="button" className="diary-button" onClick={handleSave}>
              <img
                src={save}
                alt="Share"
                onMouseOver={(e) => (e.currentTarget.src = savehover)}
                onMouseOut={(e) => (e.currentTarget.src = save)}
              />
            </button>
            <button
              type="button"
              className="diary-button"
              onClick={handleTrash}
            >
              <img
                src={send}
                alt="Share"
                onMouseOver={(e) => (e.currentTarget.src = sent)}
                onMouseOut={(e) => (e.currentTarget.src = send)}
              />
            </button>
            <button
              type="button"
              className="diary-button"
              onClick={handleLock}
              onMouseDown={(e) => e.preventDefault()}
            >
              <img
                src={isPrivate ? lock : unlock}
                alt="Lock"
                onMouseOut={(e) =>
                  (e.currentTarget.src = isPrivate ? lock : unlock)
                }
              />
            </button>
            <button type="button" className="diary-button" onClick={handleStar}>
              <img
                src={isFavorite ? star : unstar}
                alt="Star"
                onMouseOut={(e) =>
                  (e.currentTarget.src = isFavorite ? star : unstar)
                }
              />
            </button>
            <button
              type="button"
              className="diary-button"
              onClick={handleTrash}
            >
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
    </div>
  );
}

export default EditEntry;
