import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { LocalStorage } from "node-localstorage";
import auth from "../middleware/auth.js";
import { ObjectId } from "mongodb";

const router = Router();


router.post('/register', async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        // validation
        if (!(email && username && password && fullName)) {
            return res.status(400).send("Input fields should not be empty!");
        }

        // check if user exists
        const oldUser1 = await User.findOne({ email });
        const oldUser2 = await User.findOne({ username });

        if (oldUser1 || oldUser2) {
            return res.status(409).send("User already exists!");
        }

        const encryptedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: encryptedPwd,
            dateCreated: new Date().toISOString()
        });

        const token = jwt.sign(
            { 
                user_id: user._id,
                username
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h'
            }
        );
        
        res.status(201).json({
            userid: user._id,
            token: token
        });
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!(username && password)) {
            return res.status(400).send("Input fields should not be empty!");
        }

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    user_id: user._id,
                    username
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h'
                }
            );

            user.token = token;
            res.cookie('token', user.token);
            res.cookie('userid', user.id);
            return res.status(200).json({token: user.token, userid: user.id});
        }

        res.status(400).send("Invalid credentials!");
    } catch (err) {
        console.log(err);
    }
});

// temp route
router.get('/loggedin', (req, res) => {
    if (req.cookies.token) {
        return res.send("User is logged in!");
    }
    return res.send("No User is logged in")
});



// ***for api use only
router.post('/logout', auth, async (req, res) => {
    if (req.cookies['token'] && req.cookies['userid']) {
        return res.clearCookie('token').clearCookie('userid').status(200).send('Logged out successfully!');
    }

    res.send("No cookies for auth found!");
});

router.get('/isloggedin', async (req, res) => {
    const data = await authenticate(req)
    try {
        return res.json(data)
    }
    catch (err) {
        return res.json({auth : false})
    }
});

router.get('/getLoggedUser', auth, async (req, res) => {
    const user = await User.findOne({_id: req.user.user_id});
    return res.status(200).json({ 
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
    });
});


export default router;