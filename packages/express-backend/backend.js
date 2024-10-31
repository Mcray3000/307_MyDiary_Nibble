import express from "express";
import cors from "cors"

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vzutkihkzjyhnwzqsgrx.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Niblle & Scribble!");
});

app.listen(port, () => {
    console.log(
        `App listening at http://localhost:${port}`
    );
});