const getUser = require('./getUser');
const createUser = require('./createUser');
const updateUser = require('./updateUser');
const destroyUser = require('./destroyUser');

const UserController = {
    getUser,
    createUser,
    updateUser,
    destroyUser
};

module.exports = UserController;