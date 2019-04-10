const Item = require('../../db/models').Item;
const tokenIsValid = require('../../../authorization/tokenIsValid');
const { validationResult } = require('express-validator/check');

const updateItem = async (req, res) => {
    const { description, notes } = req.body;
    const userId = parseInt(req.params.userId);
    const token = req.get('authorization').substring(7);
    const errors = validationResult(req);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const updated = await Item.update({
            description,
            notes
        }, {
            where: {
                id: parseInt(req.params.itemId)
            },
            returning: true
        });

        const updatedItem = updated[1][0];

        if (updated[0]) {
            return res.status(200).json({
                success: {
                    description: updatedItem.description,
                    notes: updatedItem.notes
                }
            });
        } else {
            return res.status(400).json({ error: 'Could not update item.' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = updateItem;