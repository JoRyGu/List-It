const User = require('../../db/models').User;
const tokenIsValid = require('../../../authorization/tokenIsValid');

const destroyUser = async (req, res) => {
    const userId = parseInt(req.params.userId);

    const token = req.get('Authorization').substring(7);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const destroyed = await User.destroy({
            where: {
                id: userId
            }
        });

        if (destroyed) {
            return res.status(200).json({ success: 'User account deleted.' });
        } else {
            return res.status(400).json({ error: 'No user found with that ID.' });
        }
    } catch (err) {
        return res.status(500).json(err.response);
    }
};

module.exports = destroyUser;