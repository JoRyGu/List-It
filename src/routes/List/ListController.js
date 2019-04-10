const createList = require('./createList');
const getList = require('./getList');
const getLists = require('./getLists');
const updateList = require('./updateList');
const destroyList = require('./destroyList');

const ListController = {
    createList,
    getList,
    getLists,
    updateList,
    destroyList
};

module.exports = ListController;