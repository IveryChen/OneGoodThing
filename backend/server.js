import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import Note from "./models/Note.js";
import User from "./models/User.js";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());

// Middleware to verify JWT
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};

const usedCodes = new Set();

app.get("/auth/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      throw new Error("Authorization code is missing");
    }

    if (usedCodes.has(code)) {
      return res.status(400).json({
        error: "Authorization code has already been used",
      });
    }

    usedCodes.add(code);
    setTimeout(() => usedCodes.delete(code), 5 * 60 * 1000);

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: "authorization_code",
      }
    );

    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
      }
    );

    let user = await User.findOne({ email: userInfo.data.email });

    if (!user) {
      user = await User.create({
        name: userInfo.data.given_name,
        email: userInfo.data.email,
        googleId: userInfo.data.id,
      });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: "Auth failed" });
  }
});

// Protected notes endpoint
app.post("/api/notes", authMiddleware, async (req, res) => {
  try {
    const { text, color } = req.body;
    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail });
    if (!user) throw new Error("User not found");

    const note = new Note({
      text,
      color,
      userId: user._id,
    });

    await note.save();
    await User.findOneAndUpdate(
      { email: userEmail },
      { $push: { notes: note._id } }
    );

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

app.get("/api/notes", authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail }).populate("notes");

    if (!user) throw new Error("User not found");

    res.json(user.notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

app.put("/api/notes/:noteId", authMiddleware, async (req, res) => {
  try {
    const { noteId } = req.params;
    const { text, color } = req.body;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail }).populate("notes");

    if (!user) throw new Error("User not found");

    const note = await Note.findByIdAndUpdate(
      noteId,
      { text, color },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

app.delete("/api/notes/:noteId", authMiddleware, async (req, res) => {
  try {
    const { noteId } = req.params;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail }).populate("notes");

    if (!user) throw new Error("User not found");

    await Note.findByIdAndDelete(noteId);

    await User.findByIdAndUpdate(user._id, {
      $pull: { notes: noteId },
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

app.listen(3000);
