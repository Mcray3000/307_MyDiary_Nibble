// src/CreateUser.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser(props) {
  const [person, setPerson] = useState({
    name: "",
    password: "",
  });

  const [createUserError, setCreateUserError] = useState(null);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  }

  function submitUser() {
    props
      .handleSubmit(person)
      .then(() => {
        // Handle success
        navigate("/main");
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating user:", error);
        setCreateUserError(error.message || "Failed to create user.");
      })
      .finally(() => {
        setPerson({ name: "", password: "" });
      });
  }

  return (
    <div className="center-box">
      <div className="title-card">Nibble and Scribble</div>
      <form>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={person.name}
          onChange={handleChange}
          className="form-input"
          placeholder="name"
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={person.password}
          onChange={handleChange}
          className="form-input"
          placeholder="password"
        />
        {createUserError && ( // Display error message if it exists
          <div className="error-message">{createUserError}</div>
        )}
        <input
          type="button"
          value="Create"
          onClick={submitUser}
          className="form-button"
        />
        <input
          type="button"
          value="Login"
          onClick={() => navigate("/")}
          className="form-button"
        />
      </form>
    </div>
  );
}
export default CreateUser;
