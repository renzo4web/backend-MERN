/*
    Routes Users
    host + /api/auth
 */

const {Router} = require('express');
const {check} = require('express-validator')
const router = Router();

const {createUser, loginUser, renewToken} = require('../controllers/auth');
const {validateFields} = require("../middlewares/field-validator");

router.post('/new', [
    check('name', "Name must be provided").not().isEmpty(),
    check('email', "Email must be valid").isEmail(),
    check('password', "Password must be at least 6 characters long").isLength({min: 6}),
    validateFields
], createUser);

router.post('/', [
    check('email', "Email must be valid").isEmail(),
    check('password', "Password must be at least 6 characters long").isLength({min: 6}),
    validateFields
], loginUser);

router.get('/renew', renewToken);
module.exports = router;
