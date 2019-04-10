const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check')

const User = require('../../db/models').User;
const tokenIsValid = require('../../../authorization/tokenIsValid');

const updateUser = async (req, res) => {
    const { firstName, lastName, password } = req.body;
    const errors = validationResult(req);
    const userId = parseInt(req.params.userId);
    const token = req.get('Authorization').substring(7);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword;

    if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    }

    try {
        const updated = await User.update({
            firstName,
            lastName,
            password: hashedPassword
        }, {
            where: {
                id: parseInt(req.params.userId)
            },
            returning: true
        });

        const updatedUser = updated[1][0];

        return res.status(200).json({
            success: {
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName
            }
        });
    } catch (err) {
        return res.status(500).json(err.response);
    }
}

module.exports = updateUser;