import User from "../models/User.js";


//get ALL USERS, getfullName, getEmail, getUsername, getRole, getFollowers, getFollowing, 
export const getUsers = async (req, res, next) => {
    try {
        const result = await User.find({});
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

