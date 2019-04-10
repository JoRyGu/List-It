const List = require('../../db/models').List;
const tokenIsValid = require('../../../authorization/tokenIsValid');

const getItems = async (req, res) => {
    const listId = parseInt(req.params.listId);
    const userId = parseInt(req.params.userId);
    const token = req.get('authorization').substring(7);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const list = await List.findByPk(listId);
        const items = await list.getItems();

        if (list) {
            return res.status(200).json({ items });
        } else {
            return res.status(400).json({ error: 'Could not find a list with that ID.' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = getItems;