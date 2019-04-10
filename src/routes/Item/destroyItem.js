const Item = require('../../db/models').Item;
const tokenIsValid = require('../../../authorization/tokenIsValid');

const destroyItem = async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const userId = parseInt(req.params.userId);
    const token = req.get('authorization').substring(7);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const destroyed = await Item.destroy({
            where: {
                id: itemId
            }
        });

        if (destroyed) {
            return res.status(200).json({ success: 'Item was successfully destroyed.' });
        } else {
            return res.status(400).json({ error: 'Item could not be destroyed.' });
        }
    } catch (err) {
        return res.staus(500).json(err);
    }
}

module.exports = destroyItem;