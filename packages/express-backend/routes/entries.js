//entries.js

import express from "express";
const router = express.Router();
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { authenticateUser } from "../auth.js";
dotenv.config({ path: "../../.env" });

const supabaseUrl = "https://vzutkihkzjyhnwzqsgrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/home", authenticateUser, async (req, res) => {
  console.log(req.user_name);
  try {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("user_name", req.user_name);
    if (userError) {
      return res.status(500).send({ error: userError.message});
    }
    const user_id = userData[0].id
    const { data: entriesData, error: entriesError } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", user_id);
    if (entriesError) {
      return res.status(204).send({ error: entriesError.message });
    }
    res.status(200).send(entriesData);
  } catch (err) {
    res.status.send({ error: "Server error "});
  }
});

//returns entry given an id
router.get("/:entry_id", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("entries")
        .select("*")
        .filter("entry_id", "eq", req.params["entry_id"]);
      if (error) {
        return res.status(500).send({ error: error.message });
      }
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ error: "Server error" });

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

  router.put("/:entry_id", authenticateUser, async (req, res) => {
    const { entry_id } = req.params;
    const { title, entry, is_public, status } = req.body;
  
    try {
      const { data, error } = await supabase
        .from("entries")
        .update({ title, entry, is_public, status })
        .eq("entry_id", entry_id)
        .select()
        .single();
  
      if (error) {
        return res.status(500).send({ error: error.message });
      }
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Server error" });
    }
  });
  
  //adding a new entry
  router.post("/", authenticateUser, async (req, res) => {
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
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server error" });
  }
});

export default router;
