const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require("../models/auth");
const { generateUid, verifyToken } = require("../utils/authHelpers");
const { checkEmail, checkPass,  checklen } = require("../utils/validator");
const { ACCESS_TOKEN } = require('../constants');
const secret = process.env.JWT_SECRET
const saltRounds = 10

const loginPost = async (req, res) => {
    const { email, password } = req.body
    const exists = await auth.findOne({ email });
    if (!exists) {
        res.json({ status: false, msg: 'Wrong email or password' });
    } else {
        const match = await bcrypt.compare(password, exists.password);
        if (match) {
            const token = jwt.sign({ data: exists.uid }, secret, {
                expiresIn: '7d',
            });
            res.status(200).json({ status: true, authtoken: token, msg: "Login success" });
            return;
        } else {
            res.json({ status: false, msg: 'wrong username or password' });
        }
    }
};


const signupPost = async (req, res) => {
    try {
        let { email = "", password = "", username = "" } = req.body;
        if (!checkEmail(email)) {
            res.status(400).json({ status: false, msg: 'Enter a valid email address' });
            return;
        }
        if (!checkPass(password)) {
            res.status(400).json({ status: false, msg: 'unsafe password' });
            return;
        }
        if (!checklen(2, 100, username, true)) {
            res.status(400).json({ status: false, msg: 'invalid username' });
            return;
        }
        email = email.trim()
        username = username.trim()

        const passhash = await bcrypt.hash(password, saltRounds)
        const uid = generateUid();
        const newUser = {
            uid,
            username,
            email,
            password: passhash,
        };
        new auth(newUser).save().then((user) => {
            const token = jwt.sign({ data: uid }, secret, { expiresIn: '7d' });
            res.status(200).json({ status: true, authtoken: token, msg: "Signup success" });

        }).catch(error => {
            let errMsg;
            if (error.code == 11000) {
                errMsg = Object.keys(error.keyValue)[0] + " already exists.";
            } else {
                errMsg = error.message;
            }
            res.json({ status: false, msg: errMsg })
        })
    } catch (err) {
        res.status(500).json({ msg: err.message, status: false });
    }
};
const checkAuth = async (req, res) => {
    const token = req.headers[ACCESS_TOKEN];
    const { status, data} = await verifyToken(token);
    res.status(200).json({
        status,
        data: status ? { username:data.username, email:data.email, friends:data.friends } : null,
    });
};

module.exports = {
    loginPost, signupPost, checkAuth
}

