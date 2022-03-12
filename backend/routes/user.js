import { Router } from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import { ObjectId } from 'mongodb';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        // validation
        if (!(email && username && password && fullName)) {
            return res.status(400).send('Input fields should not be empty!');
        }

        // check if user exists
        const oldUser1 = await User.findOne({ email });
        const oldUser2 = await User.findOne({ username });

        if (oldUser1 || oldUser2) {
            return res.status(409).send('User already exists!');
        }

        const encryptedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: encryptedPwd,
            dateCreated: new Date().toISOString(),
            role: 'user',
        });

        const token = jwt.sign(
            {
                user_id: user._id,
                username,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h',
            },
        );

        res.status(201).json({
            userid: user._id,
            token: token,
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).send('Input fields should not be empty!');
        }

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    user_id: user._id,
                    username,
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h',
                },
            );

            user.token = token;
            res.cookie('token', user.token);
            res.cookie('userid', user.id);
            return res.status(200).json({ token: user.token, userid: user.id });
        }

        res.status(400).send('Invalid credentials!');
    } catch (err) {
        console.log(err);
    }
});

// temp route
router.get('/loggedin', (req, res) => {
    if (req.cookies.token) {
        return res.send('User is logged in!');
    }
    return res.send('No User is logged in');
});

// ***for api use only
router.post('/logout', auth, async (req, res) => {
    if (req.cookies['token'] && req.cookies['userid']) {
        return res.clearCookie('token').clearCookie('userid').status(200).send('Logged out successfully!');
    }

    res.send('No cookies for auth found!');
});

router.get('/isloggedin', auth, async (req, res) => {
    return res.json({ auth: true });
});

router.get('/getLoggedUser', auth, async (req, res) => {
    const user = await User.findOne({ _id: req.user.user_id });
    const posts = await Post.find({ creator: user._id }).sort({ dateCreated: -1 });
    return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        posts,
        role: user.role,
    });
});

router.get('/getByUsername', async (req, res) => {
    try {
        console.log('e1');
        const user = await User.findOne({ username: req.query.username });
        let posts = await Post.find({ creator: user._id });

        for (let i = 0; i < posts.length; i++) {
            const comment = await Comment.find({ post: posts[i]._id });
            posts[i].comments = posts[i].comments.concat(comment);
        }
        console.log(posts);

        let newFollowers = [];
        let newFollowing = [];

        for (let i = 0; i < user.followers.length; i++) {
            const u = await User.findOne({ _id: user.followers[i] });

            if (u) {
                newFollowers.push(u);
            }
        }

        for (let i = 0; i < user.following.length; i++) {
            const u = await User.findOne({ _id: user.following[i] });

            if (u) {
                newFollowing.push(u);
            }
        }

        user.followers = newFollowers;
        user.following = newFollowing;

        const { _id, username, email, fullName, followers, following } = user;
        return res.status(200).json({
            _id,
            username,
            email,
            fullName,
            followers,
            following,
            posts,
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// user followers system
router.post('/follow', auth, async (req, res) => {
    const followerUser = await User.findOne({ _id: req.user.user_id });
    const followingUser = await User.findOne({ _id: req.body.following });

    if (String(followerUser._id) !== String(followingUser._id)) {
        if (!followerUser.following.includes(String(followingUser._id))) {
            followerUser.following.push(followingUser._id);
            followingUser.followers.push(followerUser._id);

            followerUser.save();
            followingUser.save();
        } else {
            return res.json('User is already followed!');
        }
        return res.json({
            data: {
                follower: followerUser,
                following: followingUser,
            },
        });
    }
    return res.send('You cannot follow yourself!');
});

router.post('/unfollow', auth, async (req, res) => {
    const unfollowerUser = await User.findOne({ _id: req.user.user_id });
    const unfollowingUser = await User.findOne({ _id: req.body.unfollowing });
    console.log(req.body.unfollowing);
    console.log(unfollowerUser);
    console.log(unfollowingUser);

    // if user is not trying to unfollow him/herself >>>>>>
    if (String(unfollowerUser._id) !== String(unfollowingUser._id)) {
        if (unfollowerUser.following.includes(String(unfollowingUser._id))) {
            unfollowerUser.following = unfollowerUser.following.filter((id) => String(id) !== String(unfollowingUser._id));
            unfollowingUser.followers = unfollowingUser.followers.filter((id) => String(id) !== String(unfollowerUser._id));

            unfollowerUser.save();
            unfollowingUser.save();
        } else {
            return res.json('User is already unfollowed!');
        }
        return res.json({
            data: {
                follower: unfollowerUser,
                following: unfollowingUser,
            },
        });
    }
    return res.send('You cannot unfollow yourself!');
});

router.get('/');

export default router;
