'use strict';

const express = require('express');
const validateUser = require('../controllers/users/activate-user-controller');
const router = express.Router();
const registerUser = require('../controllers/users/register-user-controller');

router.route('/').post(registerUser);
router.route('/activation').get(validateUser);

module.exports = router;
