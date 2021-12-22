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
// app.use(function(req, res, next) {
//     res.header('Content-Type', 'application/json;charset=UTF-8')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     )
//     res.header('Access-Control-Allow-Origin',true);
//     next()
// });




// Api Endpoints
app.use('/api', apiRoutes);

// Authentication endpoints
app.use('/api/users',authRoutes);

const PORT = 5050;

app.listen(PORT, () => console.log(`API Running on http://localhost:${PORT}`));