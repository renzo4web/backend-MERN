const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User with this email already registered',
            });
        }

        user = new User(req.body);

        // Encrypt Password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Please contact your Database Administrator',
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user === null) {
            return res.status(400).json({
                ok: false,
                msg: 'User not found in database',
            });
        }

        // Check Password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password Invalid',
            });
        }

        // generate JWT

        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Please contact your Database Administrator',
        });
    }
};

const renewToken = async (req, res) => {
    const { uid, name } = req;

    // generate new token
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token,
        uid,
        name,
    });
};

module.exports = {
    createUser,
    loginUser,
    renewToken,
};
