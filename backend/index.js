import express from "express";
import apiRoutes from "./routes/api.js";

const app = express();

app.use(express.json());

// Api Endpoints
app.use('/api', apiRoutes);

const PORT = 5050;

app.listen(PORT, () => console.log(`API Running on http://localhost:${PORT}`));