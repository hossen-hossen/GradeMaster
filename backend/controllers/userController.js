const { User } = require("../models");

exports.getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ status: "error", message: 'User not found' });
        }

        return res.send(user);
    } catch (error) {
        return res.status(500).send({ status: "error", message: error.message });
    }
};

exports.logout = async (req, res) => {
    res.cookie('refreshToken', '', { maxAge: 1 });
    res.cookie('isLoggedIn', '', { maxAge: 1 });
    return res.status(200).send({ message: 'successfully logout' })
};