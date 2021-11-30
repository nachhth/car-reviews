'use strict';

const throwJsonError = require('../errors/throw-jason-error');

function isAdmin(role) {
  if (role !== 'admin') {
    throwJsonError(401, 'Forbidden Access');
  }
  return true;
}

module.exports = { isAdmin };
