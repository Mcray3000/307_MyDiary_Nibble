// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Form from "./Form.jsx";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => {
        // console.log("json in hook ", json); // hard coded "uses_list" no longer exists cause it is now in db
        setCharacters(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => res.json())
      .then((person) => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteUser(person) {
    const promise = fetch(`http://localhost:8000/users/${person._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function removeOneCharacter(index) {
    const updated = characters[index];
    // deleteUser(updated) find what i want send id delete confirem responce handle responce
    // console.log(updated);
    deleteUser(updated);
    setCharacters(characters.filter((_, i) => i !== index));
  }
  console.log("Characters in my app", characters);
  return (
    <div className="container">
      {/* <Table characterData={characters} removeCharacter={removeOneCharacter} /> */}
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
