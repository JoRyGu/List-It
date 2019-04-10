const List = require('../../db/models').List;
const tokenIsValid = require('../../../authorization/tokenIsValid');

const getList = async (req, res) => {
    const listId = parseInt(req.params.listId);
    const userId = parseInt(req.params.userId);
    const token = req.get('Authorization').substring(7);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const list = await List.findOne({ where: { id: listId }});

        if (list) {
            const user = await list.getUser();
            const items = await list.getItems();

            return res.status(200).json({
                name: list.name,
                category: list.category,
                ownedBy: `${user.firstName} ${user.lastName}`,
                items
            });
        } else {
            return res.status(400).json({ error: 'No list found with that ID.' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
    
}

module.exports = getList;