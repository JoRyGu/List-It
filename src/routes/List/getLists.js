const User = require('../../db/models').User;
const tokenIsValid = require('../../../authorization/tokenIsValid');

const getLists = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const token = req.get('authorization').substring(7);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const user = await User.findByPk(userId);
        const lists = await user.getLists();

        if (user) {
            return res.status(200).json({
                lists
            });
        } else {
            return res.status(400).json({ error: 'Could not find a user with that ID.' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = getLists;