const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
    const { username, email, password, phone, gender, address } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        return res.status(400).send({ status: "error", message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            username,
            password: hashedPassword,
            email,
            phone,
            gender,
            address: address.formatted_address
        });
        return res.send({ status: "success", message: "User successfully registered" })
    } catch (error) {
        return res.send({ status: "error", message: error.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({ message: "Email provided is not a registered account." });
        }

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Password validation passed, create tokens
        const accessToken = jwt.sign({ id: user.id }, process.env.AUTH_TOKEN_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15d' });

        // Remove password from user object before sending response
        const userData = { ...user.toJSON() };
        delete userData.password;

        const response = {
            userData,
            accessToken,
        };

        res.cookie('refreshToken', refreshToken, {
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(new Date().getTime() + 30 * 1440 * 60 * 1000),
            httpOnly: false,
        });
        res.cookie('isLoggedIn', true, {
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(new Date().getTime() + 30 * 1440 * 60 * 1000),
            httpOnly: false,
        });

        return res.status(200).send({
            status: 'success',
            response
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: error.message });
    }
}

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    try {
        const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const userData = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        const newAccessToken = jwt.sign({ id }, process.env.AUTH_TOKEN_SECRET, { expiresIn: '1d' });
        const newRefreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15d' });

        res.cookie('refreshToken', newRefreshToken, {
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(new Date().getTime() + 30 * 1440 * 60 * 1000),
            httpOnly: false,
        });
        res.cookie('isLoggedIn', true, {
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(new Date().getTime() + 30 * 1440 * 60 * 1000),
            httpOnly: false,
        });

        return res.send({
            userData,
            accessToken: newAccessToken,
        });
    } catch (e) {
        return res.status(401).send(e.message);
    }
}
