import express from "express";
import cors from "cors";
//import dotenv from "dotenv";

import { createClient } from "@supabase/supabase-js";

//dotenv.config();

const app = express();
const port = 8000;

//const supabaseUrl = 'https://vzutkihkzjyhnwzqsgrx.supabase.co';
//const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://vzutkihkzjyhnwzqsgrx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6dXRraWhremp5aG53enFzZ3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNzYxNTAsImV4cCI6MjA0NDg1MjE1MH0.A-HndbYxKeBZFFjhSk7j-8EOZ2e31sBPuWFzKFtp5Q8",
);

//not sure how to make the original "const make_new_user = () => {}" syntax work. Hopefully this will work the same
async function make_new_user(username, password) {
  const { data, error } = await supabase
    .from("users")
    .insert({ user_name: username, password_hash: password });

  if (error) {
    console.log("Error creating new user: ", error);
    return false;
  } else {
    return true;
  }
}

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Nibble & Scribble!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post("/users", (req, res) => {
  const user_name = req.body.user_name;
  const password = req.body.password;
  //password_hash =
  /* For now, just store unhashed password. 
  Will need to change this soon.
  btw NEVER DO THIS in real code :)
  */

  make_new_user(user_name, password)
    .then((success_result) => {
      if (success_result) res.set(201).send();
      else res.set(400).send();
    })
    .catch((error) => console.log(error));
});

export default { make_new_user };
