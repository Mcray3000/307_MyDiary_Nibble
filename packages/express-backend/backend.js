// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import userRouter from "./routes/users.js";
import entriesRouter from "./routes/entries.js";


const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://scribbleandnibble.vercel.app",
      "http://localhost:5173",
    ];

    // Allow requests from Vercel preview deployments
    const isVercelPreviewDeployment =
      origin && origin.startsWith("https://scribbleandnibble-");

    if (
      !origin ||
      allowedOrigins.indexOf(origin) !== -1 ||
      isVercelPreviewDeployment
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  //credentials: true // maybe we need this later
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Nibble & Scribble!");
});

app.use('/users', userRouter)
app.use('/entries', entriesRouter)

app.listen(8000, () => {
  console.log(`Server running at ${process.env.VITE_BACKEND_URL}`);
});


