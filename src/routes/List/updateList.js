const List = require('../../db/models').List;
const tokenIsValid = require('../../../authorization/tokenIsValid');
const { validationResult } = require('express-validator/check');

const updateList = async (req, res) => {
    const { name, category } = req.body;
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
        const updated = await List.update({
            name,
            category
        }, {
            where: {
                id: parseInt(req.params.listId)
            },
            returning: true
        });

        const updatedList = updated[1][0];

        if (updated[0]) {
            return res.status(200).json({
                success: {
                    name: updatedList.name,
                    category: updatedList.category
                }
            });
        } else {
            return res.status(400).json({ error: 'List could not be updated.' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = updateList;