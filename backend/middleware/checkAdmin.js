import User from "../models/User.js";

const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user.user_id});

        if (!user) {
            throw new Error('Not a user with that id');
        }

        if (user.role === 'admin') {
            next();
        }
        else {
            res.status(400).send("You dont have privileges to access this page");

        }
        

    } catch (err) {
        res.json("Error on verifying admin");
    }

}

export default verifyAdmin;