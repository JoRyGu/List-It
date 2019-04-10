const express = require('express');
const passport = require('passport');
const { body } = require('express-validator/check');

const UserController = require('./User/UserController');
const ListController = require('./List/ListController');
const ItemController = require('./Item/ItemController');
const LoginController = require('./Login/LoginController');

const router = express.Router();

/****************
*  User Routes  *
****************/
router.get('/api/users/:userId', passport.authenticate('jwt', {session: false}), UserController.getUser);

router.post('/api/users', [
    body('firstName')
        .not().isEmpty()
        .withMessage('First name field is required.')
        .isLength({ max: 30 })
        .withMessage('First name cannot be longer than 30 characters.'),
    body('lastName')
        .not().isEmpty()
        .withMessage('Last name field is required.')
        .isLength({ max: 30 })
        .withMessage('Last name cannot be longer than 30 characters.'),
    body('email')
        .not().isEmpty()
        .withMessage('Email field is required.')
        .isEmail()
        .withMessage('Email field must contain a valid email.')
        .normalizeEmail(),
    body('password')
        .not().isEmpty()
        .withMessage('Password field is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
], UserController.createUser);

router.patch('/api/users/:userId', [
    body('firstName')
        .isLength({ max: 30 })
        .withMessage('First name cannot be longer than 30 characters'),
    body('lastName')
        .isLength({ max: 30})
        .withMessage('Last name cannot be longer than 30 characters'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
], passport.authenticate('jwt', {session: false}), UserController.updateUser);

router.delete('/api/users/:userId', passport.authenticate('jwt', {session: false}), UserController.destroyUser);

/***************
*  List Routes *
***************/

router.post('/api/users/:userId/lists', [
    body('name')
        .not().isEmpty()
        .withMessage('Name field is required.')
        .isLength({ max: 30 })
        .withMessage('Name field cannot be longer than 30 characters.'),
    body('category')
        .not().isEmpty()
        .withMessage('Category field is required.')
        .isLength({ max: 30 })
        .withMessage('Category field cannot be longer than 30 characters.')
], passport.authenticate('jwt', {session: false}), ListController.createList);

router.get('/api/users/:userId/lists/:listId', passport.authenticate('jwt', {session: false}), ListController.getList);

router.get('/api/users/:userId/lists', passport.authenticate('jwt', {session: false}), ListController.getLists);

router.patch('/api/users/:userId/lists/:listId', [
    body('name')
        .isLength({ max: 30 })
        .withMessage('Name field cannot be longer than 30 characters.'),
    body('category')
        .isLength({ max: 30 })
        .withMessage('Category field cannot be longer than 30 characters.')
], passport.authenticate('jwt', {session: false}), ListController.updateList);

router.delete('/api/users/:userId/lists/:listId', passport.authenticate('jwt', {session: false}), ListController.destroyList);

/****************
*  Item Routes  *
****************/

router.post('/api/users/:userId/lists/:listId/items', [
    body('description')
        .not().isEmpty()
        .withMessage('Description field is required.')
        .isLength({ max: 30 })
        .withMessage('Description field cannot be longer than 30 characters.'),
    body('notes')
        .isLength({ max: 100 })
        .withMessage('Notes field cannot be longer than 100 characters.')
], passport.authenticate('jwt', {session: false}), ItemController.createItem);

router.get('/api/users/:userId/lists/:listId/items', passport.authenticate('jwt', {session: false}), ItemController.getItems);

router.get('/api/users/:userId/lists/:listId/items/:itemId', passport.authenticate('jwt', {session: false}), ItemController.getItem);

router.patch('/api/users/:userId/lists/:listId/items/:itemId', [
    body('description')
        .isLength({ max: 30 })
        .withMessage('Description field cannot be longer than 30 characters.'),
    body('notes')
        .isLength({ max: 100 })
        .withMessage('Notes field cannot be longer than 100 characters.')
], passport.authenticate('jwt', {session: false}), ItemController.updateItem);

router.delete('/api/users/:userId/lists/:listId/items/:itemId', passport.authenticate('jwt', {session: false}), ItemController.destroyItem);

/****************
*  Login Route  *
****************/

router.post('/api/login', [
    body('email')
        .not().isEmpty()
        .withMessage('Email field is required.')
        .isEmail()
        .withMessage('Email field must contain a valid email.')
        .normalizeEmail(),
    body('password')
        .not().isEmpty()
        .withMessage('Password field is required.')
], LoginController);

module.exports = router;