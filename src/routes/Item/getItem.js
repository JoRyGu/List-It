const Item = require('../../db/models').Item;
const tokenIsValid = require('../../../authorization/tokenIsValid');

const getItem = async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const userId = parseInt(req.params.userId);
    const token = req.get('authorization').substring(7);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const item = await Item.findByPk(itemId);

        if (item) {
            const list = await item.getList();
            const user = await list.getUser();

            return res.status(200).json({
                description: item.description,
                notes: item.notes,
                partOfList: list.name,
                ownedBy: `${user.firstName} ${user.lastName}`,
                isComplete: item.isComplete 
            });
        } else {
            return res.status(400).json({ error: 'Could not find Item with that ID.' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = getItem;