import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
dotenv.config({ path: "../../.env" });

import { createClient } from "@supabase/supabase-js";

const app = express();
const port = 8000;

const supabaseUrl = "https://vzutkihkzjyhnwzqsgrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const numSaltRounds = Number(process.env.SALT_ROUNDS);

async function hash_password(password) {
  const hash = await bcryptjs.hash(password, numSaltRounds);
  return hash;
}

//not sure how to make the original "const make_new_user = () => {}" syntax work. Hopefully this will work the same
async function make_new_user(username, password) {
  const hash = await hash_password(password);
  const { data, error } = await supabase
    .from("users")
    .insert({ user_name: username, password_hash: hash });

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
  
  make_new_user(user_name, password)
    .then((success_result) => {
      if (success_result) res.status(201).send();
      else res.status(409).send();
    })
    .catch((error) => console.log(error));
});

export default { make_new_user };
