const createItem = require('./createItem');
const getItems = require('./getItems');
const getItem = require('./getItem');
const updateItem = require('./updateItem');
const destroyItem = require('./destroyItem');

const ItemController = {
    createItem,
    getItems,
    getItem,
    updateItem,
    destroyItem
};

module.exports = ItemController;