// src/ViewEntry.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import star from "./assets/Stared.svg";
import unstar from "./assets/Unstared.svg";
import send from "./assets/Send.svg";
import sent from "./assets/SendHover.svg";
import HamburgerMenu from "./HamburgerMenu";

function ViewEntry() {
  const { id } = useParams(); // Get the entry ID from the URL
  const navigate = useNavigate(); // For redirecting after saving
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

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
        console.log("API response: ", data, "id: ", id);
        setTitle(data[0].title);
        setEntry(data[0].entry);
      })
      .catch((error) => {
        console.error("Error fetching entry:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setEntry(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStar = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <HamburgerMenu />
      <div className="diary-container">
        <div className="diary-header">
          <div className="diary-title">{title}</div>
        </div>
        <div className="diary-form">
          {" "}
          <div>{entry}</div>
          <div className="diary-footer">
            <button type="button" className="diary-button">
              <img
                src={send}
                alt="Share"
                onMouseOver={(e) => (e.currentTarget.src = sent)}
                onMouseOut={(e) => (e.currentTarget.src = send)}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEntry;
