import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// some sort of auth
// app.post('/api/register'...
// app.post('/api/login'...
// app.post('/api/notes'...
// app.get('/api/notes'...

app.listen(3000);
