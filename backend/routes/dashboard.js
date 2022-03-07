import { Router } from "express";
import auth from "../middleware/auth.js";
import checkAdmin from "../middleware/checkAdmin.js";


const router = Router();

router.get('/users', auth, checkAdmin, (req, res) => {
    res.send('Admin Page');
});




export default router