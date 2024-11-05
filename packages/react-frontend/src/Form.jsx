// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "password")
      setPerson({ name: person["name"], password: value });
    else setPerson({ name: value, password: person["password"] });
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", password: "" });
  }

  return (
    <div class="center-box">
      <div class="title-card">Scribble and Nibble</div>
      <form>
        <label for="name" class="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={person.name}
          onChange={handleChange}
          class="form-input"
          placeholder="name"
        />
        <label for="password" class="form-label">
          Password
        </label>
        <input
          type="text"
          name="password"
          id="password"
          value={person.password}
          onChange={handleChange}
          class="form-input"
          placeholder="password"
        />
        <input
          type="button"
          value="Login"
          onClick={submitForm}
          class="form-button"
        />
        <input
          type="button"
          value="New User"
          onClick={submitForm}
          class="form-button"
        />
      </form>
    </div>
  );
}
export default Form;
