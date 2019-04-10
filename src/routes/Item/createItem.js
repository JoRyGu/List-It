const Item = require('../../db/models').Item;
const tokenIsValid = require('../../../authorization/tokenIsValid');
const { validationResult } = require('express-validator/check');

const createItem = async (req, res) => {
    const listId = parseInt(req.params.listId);
    const userId = parseInt(req.params.userId);
    const token = req.get('authorization').substring(7);
    const { description, notes } = req.body;
    const errors = validationResult(req);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!errors.isEmpty()) { 
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const newItem = await Item.create({
            description,
            notes,
            listId
        });

        if (newItem) {
            return res.status(200).json({
                description: newItem.description,
                notes: newItem.notes
            });
        } else {
            return res.status(400).json({ error: 'Item could not be created.' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = createItem;