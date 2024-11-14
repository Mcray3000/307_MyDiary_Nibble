import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config({ path: "../../.env" });

import { createClient } from "@supabase/supabase-js";

const app = express();
const port = 8000;

const supabaseUrl = "https://vzutkihkzjyhnwzqsgrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

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
      },
    );
  });
}

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Nibble & Scribble!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post("/users/login", async (req, res) => {
  const user_name = req.body.user_name; // from form
  const password = req.body.password;

  const hash = await supabase
    .from("users")
    .select("password_hash")
    .eq("user_name", user_name);

  if (hash["data"][0] == undefined) {
    // invalid username
    res.status(401).send("Unauthorized");
  } else {
    bcryptjs
      .compare(password, hash["data"][0]["password_hash"])
      .then((matched) => {
        if (matched) {
          generate_access_token(user_name).then((token) => {
            res.status(200).send({ token: token });
          });
        } else {
          // invalid password
          res.status(401).send("Unauthorized");
        }
      })
      .catch(() => {
        res.status(401).send("Unauthorized");
      });
  }
});
