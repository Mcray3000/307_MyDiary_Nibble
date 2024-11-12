// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [person, setPerson] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "password")
      setPerson({ name: person["name"], password: value });
    else setPerson({ name: value, password: person["password"] });
  }

  function submitForm() {
    props.handleSubmit(person);
    navigate("/main");
    setPerson({ name: "", password: "" });
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
          type="text"
          name="password"
          id="password"
          value={person.password}
          onChange={handleChange}
          className="form-input"
          placeholder="password"
        />
        <input
          type="button"
          value="Login"
          onClick={submitForm}
          className="form-button"
        />
        <input
          type="button"
          value="New User"
          onClick={() => navigate("/create")}
          className="form-button"
        />
      </form>
    </div>
  );
}
export default Login;
