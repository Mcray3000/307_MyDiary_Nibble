import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs"
dotenv.config({ path: "../../.env" });

import { createClient } from "@supabase/supabase-js";

const app = express();
const port = 8000;

const supabaseUrl = "https://vzutkihkzjyhnwzqsgrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check_login(user_name, password) {
  const hash_to_check = await supabase
    .from("users")
    .select("password_hash")
    .eq('user_name', user_name);
  
  const is_correct_password = bcryptjs
    .compare(password, hash_to_check);

  return is_correct_password
};

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Nibble & Scribble!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/users", (req, res) => {
  const user_name = req.body.user_name;
  const password = req.body.password;

  const was_successful = false;
  check_login(user_name, password)
    .then((result) => {
      was_successful = result;
    })
    .catch((error) => {
      console.log(error)
    });
});