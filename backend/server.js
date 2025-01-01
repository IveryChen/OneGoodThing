import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/auth/google/callback", async (req, res) => {
  try {
    const { code } = req.query;
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

    // Store user in your database
    // Create session/JWT

    res.json(userInfo.data);
  } catch (error) {
    res.status(500).json({ error: "Auth failed" });
  }
});

// app.post('/api/register'...
// app.post('/api/login'...
// app.post('/api/notes'...
// app.get('/api/notes'...

app.listen(3000);
