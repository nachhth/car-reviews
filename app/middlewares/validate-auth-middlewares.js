'use strict';

const jwt = require('jsonwebtoken');
const createJsonError = require('../errors/create-json-error');
const throwJsonError = require('../errors/throw-jason-error');
const { JWT_SECRET } = process.env;

function extractAccessToken(headers) {
  const { authorization } = headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throwJsonError(403, 'Authentication required');
  }
  return authorization.split(' ')[1];
  // return authorization.slice(7, authorization.lenght)
}

function validateAuth(req, res, next) {
  try {
    // console.log(req.headers);
    const { headers } = req;
    const token = extractAccessToken(headers);
    // console.log('token:', token);
    const decodedToken = jwt.verify(token, JWT_SECRET);
    // console.log('token:', decodedToken);
    const { id, name, role } = decodedToken;
    req.auth = { id, name, role };

    next();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = validateAuth;
