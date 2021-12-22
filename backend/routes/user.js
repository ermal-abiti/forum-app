import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";

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
        
        res.status(201).send(`User registered successfully as '${user.username}'`);
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
            return res.status(200).json({token: user.token});
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

// temp route
router.get('/loggeduser', async (req, res) => {
    if (req.cookies['token']) {
        let token = req.cookies['token'];
        let decoded = jwtDecode(token);
        let user = await User.findOne({username: decoded.username});

        res.status(200).json({
            id: user._id
        });
    }
});

router.post('/logout', async (req, res) => {
    if (req.cookies['token'] && req.cookies['userid']) {
        return res.clearCookie('token').clearCookie('userid').status(200).send('Logged out successfully!');
    }

    res.send("No cookies for auth found!");
});

export default router;