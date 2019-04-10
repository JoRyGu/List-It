const decode = require('jwt-decode');

function tokenIsValid(token, userId) {
    if (!token) {
        return false;
    }

    const decodedToken = decode(token);

    if (userId !== decodedToken.id) {
        return false;
    }

    if (new Date().getTime() / 1000 > decodedToken.exp) {
        return false;
    }

    return true;
}

module.exports = tokenIsValid;