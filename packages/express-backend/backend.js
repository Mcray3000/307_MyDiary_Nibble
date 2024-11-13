import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import { createClient } from "@supabase/supabase-js";

const app = express();
const port = 8000;

const supabaseUrl = "https://vzutkihkzjyhnwzqsgrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Nibble & Scribble!");
});

app.get("/entries/:id", async (req, res) => {
  try {
    const {data, error } = await supabase
      .from('entries')
      .select('*')
      .filter('entry_id', 'eq', req.params["id"]);
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: 'Server error'});
  }
});

app.get("/entries/", async (req, res) => {
  const is_public = req.query.is_public ? req.query.is_public : "False";
  try {
    const {data, error } = await supabase
      .from('public_entries')
      .select('*')
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    console.log(data)
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: 'Server error'});
  }
});

app.post("/entries", async (req, res) => {
  const { user_id, title, entry, is_public, status } = req.body;
  console.log(req.body); 

  try {
    const { data, error } = await supabase
      .from('entries')
      .insert({user_id, title, entry, is_public, status })
      .select();

      if (error) {
      return res.status(500).send({ error: error.message });
    }
    //currently not doing anything
    //TODO: Make this User Friendly
    const formattedData = data.map(entry => {
      if (entry.date) {
        const dateVar = new Date("2021-09-24T12:38:54.656Z");
        console.log(dateVar.toLocaleString());
      }
      return entry;
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.log(err); 
    res.status(500).send({ error: 'Server error' });
  }d
});

app.post("/users", async (req, res) => {
  const {user_name, password_hash} = req.body;
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({user_name, password_hash})
      .select()

      if (error) {
      return res.status(500).send({ error: error.message });
    }
    res.status(200).send("SUCCESS");
  } catch (err) {
    console.log(err); 
    res.status(500).send({ error: 'Server error' });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
