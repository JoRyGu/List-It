const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

const User = require('../../db/models').User;

const LoginController = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.findOne({ where: { email }});

    if (user) {
        const passwordDoesMatch = await bcrypt.compare(password, user.password);

        if (passwordDoesMatch) {
            const payload = {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email
            }

            jwt.sign(payload, process.env.secret, { expiresIn: '1d' }, (err, token) => {
                return res.status(200).json({token, id: user.id});
            })
        } else {
            return res.status(400).json({ errors: { user: 'No users registered with that email or password.' }});
        }
    } else {
        return res.status(400).json({ errors: { user: 'No users registered with that email or password.' }});
    }
}

module.exports = LoginController;