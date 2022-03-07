import express from "express";
import apiRoutes from "./routes/api.js";
import authRoutes from "./routes/user.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors());

// Api Endpoints
app.use('/api', apiRoutes);

// Dashboard Endpoints
app.use('/dashboard', dashboardRoutes);

// Authentication endpoints
app.use('/api/users',authRoutes);

//not found endpoints
app.use('*', (req, res, next) => {
    return res.status(404).json({ message: 'Page Not Found!'});
});

const PORT = 5050;

app.listen(PORT, () => console.log(`API Running on http://localhost:${PORT}`));