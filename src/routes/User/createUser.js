const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

const User = require('../../db/models').User;

const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const existingUser = await User.findOne({ where: {email}});

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists for that email.' });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        if (user) {
            const payload = {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email
            }

            jwt.sign(payload, process.env.secret, { expiresIn: '1d' }, (err, token) => {
                return res.status(200).json({ token, id: user.id });
            })
        } else {
            return res.status(400).json({ error: "Placeholder error. Add validation" });
        }    
    } catch (err) {
        return res.status(500).json(err.response);
    }
}

module.exports = createUser;