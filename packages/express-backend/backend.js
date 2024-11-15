// backend.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";

dotenv.config({ path: "../../.env" });

import { createClient } from "@supabase/supabase-js";

const app = express();
const supabaseUrl = "https://vzutkihkzjyhnwzqsgrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsOptions = {
  origin: "https://scribbleandnibble.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

function generate_access_token(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

// app.use(cors());

const numSaltRounds = Number(process.env.SALT_ROUNDS);

// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Nibble & Scribble!");
});

async function hash_password(password) {
  const hash = await bcryptjs.hash(password, numSaltRounds);
  return hash;
}

//not sure how to make the original "const make_new_user = () => {}" syntax work. Hopefully this will work the same
async function make_new_user(username, password) {
  console.log(username, password);
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

app.post("/users", (req, res) => {
  const user_name = req.body.name;
  const password = req.body.password;
  make_new_user(user_name, password)
    .then((success_result) => {
      if (success_result) res.status(201).send();
      else res.status(403).send();
    })
    .catch((error) => console.log(error));
});

//returns entry given an id
app.get("/entries/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .filter("entry_id", "eq", req.params["id"]);
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

//used to look up all public entries
app.get("/entries/", async (req, res) => {
  const is_public = req.query.is_public ? req.query.is_public : "False";
  try {
    const { data, error } = await supabase.from("public_entries").select("*");
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

//adding a new entry
app.post("/entries", async (req, res) => {
  const { user_id, title, entry, is_public, status } = req.body;
  // Set publish_date if status is 'published'
  const publish_date = status === "published" ? new Date().toISOString() : null;
  console.log(req.body);

  try {
    const { data, error } = await supabase
      .from("entries")
      .insert({ user_id, title, entry, is_public, status, publish_date })
      .select();

    if (error) {
      return res.status(500).send({ error: error.message });
    }
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server error" });
  }
});

app.listen(8000, () => {
  console.log(`Server running at https://three07-mydiary-nibble.onrender.com`);
});

app.get("/users", async (req, res) => {
  const name = req.query.name;
  let data, error;

  if (name === undefined) {
    ({ data, error } = await supabase.from("users").select());
  } else {
    ({ data, error } = await supabase
      .from("users")
      .select()
      .eq("user_name", name));
  }

  if (error) {
    return res.status(500).send({ error: error.message });
  }

  return res.status(200).send(data);
});

//export default { make_new_user };
