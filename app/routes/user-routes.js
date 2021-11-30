'use strict';

const express = require('express');
const validateUser = require('../controllers/users/activate-user-controller');
const router = express.Router();
const registerUser = require('../controllers/users/register-user-controller');
const loginUser = require('../controllers/users/login-users-controller');

const validateAuth = require('../middlewares/validate-auth-middlewares');
const getUsers = require('../controllers/users/get-users-controller');
const getUserProfile = require('../controllers/users/get-userProfile-controller');

// TODAS LAS URLS SIGUIENTES EMPIEZAN POR /api/v1/users...

// URL's PUBLICAS
router.route('/').post(registerUser);
router.route('/activation').get(validateUser);
router.route('/login').post(loginUser);

// URL's PRIVADAS [LAS QUE TIENEN .all(validateAuth)]

router.route('/').all(validateAuth).get(getUsers);
router.route('/profile').all(validateAuth).get(getUserProfile);

module.exports = router;
