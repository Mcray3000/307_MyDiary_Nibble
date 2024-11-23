//entries.js 

import express from "express";
const router = express.Router()
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const supabaseUrl = "https://vzutkihkzjyhnwzqsgrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//returns entry given an id
router.get("/:id", async (req, res) => {
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
  router.get("/", async (req, res) => {
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
  router.post("/", async (req, res) => {
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
  

  export default router;
