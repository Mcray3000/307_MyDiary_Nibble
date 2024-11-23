//users.js
import express from "express";
const router = express.Router()
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vzutkihkzjyhnwzqsgrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", async (req, res) => {
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

  router.post("/login", async (req, res) => {
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



  async function hash_password(password) {
    const hash = await bcryptjs.hash(password, numSaltRounds);
    return hash;
  }
  
  const numSaltRounds = Number(process.env.SALT_ROUNDS);

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

router.post("/", (req, res) => {
    const user_name = req.body.name;
    const password = req.body.password;
    make_new_user(user_name, password)
    .then((success_result) => {
        if (success_result) res.status(201).send();
        else res.status(403).send();
    })
    .catch((error) => console.log(error));
});  

export default router;
