const List = require('../../db/models').List;
const tokenIsValid = require('../../../authorization/tokenIsValid');
const { validationResult } = require('express-validator/check');

const createList = async (req, res) => {
    const { name, category } = req.body;
    const userId = parseInt(req.params.userId);
    const token = req.get('Authorization').substring(7);
    const errors = validationResult(req);

    if (!tokenIsValid(token, userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const newList = await List.create({
            name,
            category,
            userId
        });

        if (newList) {
            return res.status(200).json({ success: 'List successfully created.' });
        } else {
            return res.status(400).json({ error: 'Could not create list.' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

module.exports = createList;