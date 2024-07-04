const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
    const { username, email, password, phone, gender, address } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        return res.send({ status: "error", message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            username,
            password: hashedPassword,
            email,
            phone,
            gender,
            address
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
            return res.status(404).json({ message: "Email provided is not a registered account." });
        }

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Password validation passed, create tokens
        const accessToken = jwt.sign({ id: user.id }, process.env.AUTH_TOKEN_SECRET, { expiresIn: '1d' });

        // Remove password from user object before sending response
        const userData = { ...user.toJSON() };
        delete userData.password;

        const response = {
            userData,
            accessToken,
        };

        return res.status(200).send({
            status: 'success',
            response
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: error.message });
    }
}
