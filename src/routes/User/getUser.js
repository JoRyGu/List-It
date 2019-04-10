const User = require('../../db/models').User;
const tokenIsValid = require('../../../authorization/tokenIsValid');

const getUser = async (req, res) => {
    const userId = parseInt(req.params.userId);

    const token = req.get('Authorization').substring(7);
    
    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const user = await User.findByPk(userId);

        if (user) {
            return res.status(200).json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            });
        } else {
            res.status(400).json({ error: 'No user for that ID.' });
        }
    } catch (err) {
        res.status(500).json(err.response);
    }
    
}

module.exports = getUser;