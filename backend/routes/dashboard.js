import { Router } from "express";
import auth from "../middleware/auth.js";
import checkAdmin from "../middleware/checkAdmin.js";
import  { getUsers }  from "../controllers/DashboardController.js";


const router = Router();
// get /users

// put /user ? userid=sl;akdsa;ld


// delete /user ? user
router.get('/users', getUsers);





export default router