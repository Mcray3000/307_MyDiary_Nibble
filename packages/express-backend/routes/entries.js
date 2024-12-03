//entries.js

import express from "express";
const router = express.Router();
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

//returns entry given an username
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    // const { data: usersData, error: usersError } = await supabase
    //   .from("users")
    //   .select("id")
    //   .eq("user_name", username);

    // if (usersError) {
    //   console.error("Error fetching user ID:", usersError);
    //   return res.status(500).send({ error: usersError.message });
    // }

    // if (usersData.length === 0) {
    //   return res.status(404).send({ error: "User not found" });
    // }

    // const userId = usersData[0].id;

    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", 125);
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

//used to look up all public entries
router.get("/", async (req, res) => {
  const is_public = req.query.is_public ? req.query.is_public : "False";
  try {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", 125);
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, entry, is_public, status } = req.body;

  try {
    const { data, error } = await supabase
      .from("entries")
      .update({ title, entry, is_public, status })
      .eq("entry_id", id)
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

export default router;
