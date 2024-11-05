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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
