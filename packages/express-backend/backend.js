import express from "express";
import cors from "cors"
//import dotenv from "dotenv";

import { createClient } from '@supabase/supabase-js'

//dotenv.config();

const app = express();
const port = 8000;

//const supabaseUrl = 'https://vzutkihkzjyhnwzqsgrx.supabase.co';
//const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient('https://vzutkihkzjyhnwzqsgrx.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6dXRraWhremp5aG53enFzZ3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNzYxNTAsImV4cCI6MjA0NDg1MjE1MH0.A-HndbYxKeBZFFjhSk7j-8EOZ2e31sBPuWFzKFtp5Q8');

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Nibble & Scribble!");
});

app.listen(port, () => {
    console.log(
        `Server running at http://localhost:${port}`
    );
});