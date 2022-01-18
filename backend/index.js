import express from "express";
import apiRoutes from "./routes/api.js";
import authRoutes from "./routes/user.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors());

// Api Endpoints
app.use('/api', apiRoutes);

// Authentication endpoints
app.use('/api/users',authRoutes);

const PORT = 5050;

app.listen(PORT, () => console.log(`API Running on http://localhost:${PORT}`));