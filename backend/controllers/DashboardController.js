import User from '../models/User.js';
import router from '../routes/dashboard.js';

//get ALL USERS, getfullName, getEmail, getUsername, getRole,
export const getUsers = async (req, res, next) => {
    try {
        const result = await User.find({});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export async function updateUser(req, res) {
    try {
        await User.updateOne({ _id: req.params.id }, req.body);

        return res.send('Post updated successfully!');
    } catch (err) {
        throw new error(err);
    }
}

export async function deleteUser(req, res) {
    try {
        await User.deleteOne({ _id: req.params.id }, req.body);

        return res.send('Post deleted successfully');
    } catch (err) {
        console.log(err);
    }
}
