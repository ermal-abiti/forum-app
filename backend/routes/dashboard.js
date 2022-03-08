import { Router } from "express";
import auth from "../middleware/auth.js";
import checkAdmin from "../middleware/checkAdmin.js";
import  { getUsers, updateUser}  from "../controllers/DashboardController.js";


const router = Router();
// get /users

// put /user ? userid=sl;akdsa;ld


// delete /user ? user
router.get('/users', getUsers);
router.put('/users/:id', updateUser);





export default router