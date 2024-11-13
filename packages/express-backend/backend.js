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

    res.status(200).json({ message: 'Entry created successfully', data });
  } catch (err) {
    console.log(err); 
    res.status(500).send({ error: 'Server error' });
  }

});




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
