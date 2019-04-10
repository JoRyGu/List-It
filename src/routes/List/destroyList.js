const List = require('../../db/models').List;
const tokenIsValid = require('../../../authorization/tokenIsValid');

const destroyList = async (req, res) => {
    const listId = parseInt(req.params.listId);
    const userId = parseInt(req.params.userId);
    const token = req.get('Authorization').substring(7);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const destroyed = await List.destroy({
            where: {
                id: listId
            }
        });

        if (destroyed) {
            return res.status(200).json({ success: 'List was successfully deleted.' });
        } else {
            return res.status(400).json({ error: 'List could not be found with that ID.' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = destroyList;