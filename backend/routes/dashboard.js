import { Router } from "express";
import auth from "../middleware/auth.js";


const router = Router();

router.get('/users', getUsers, );




export default router