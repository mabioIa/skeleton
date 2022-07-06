process.env.NODE_ENV !== "production" ? require("dotenv").config() : false;

import express from "express";
const app = express();

// Only run devBundle in development
import devBundle from "./devBundle";
devBundle.compile(app);

// Serve static files from dist
import path from "path";
const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// Route-handler to render templates at root
import template from "./../template";
app.get("/", (req, res) => {
  res.status(200).send(template());
});

// Start server

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, function start(err) {
  if (err) {
    console.log(err);
  }

  console.info(`Server started on localhost:${PORT}`);
});

// Connect to MongoDB instance

import { MongoClient } from "mongodb";
const url = process.env.MONGODB_URI;
MongoClient.connect(url, (err, db) => {
  try {
    console.log("Connected to MongoDB.");
    db.close();
  } catch (err) {
    console.log(err);
  }
});
