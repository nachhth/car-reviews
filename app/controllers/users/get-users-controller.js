'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { findAllUsers } = require('../../repositories/user-repository');

async function getUsers(req, res) {
  try {
    const { role } = req.auth;

    if (role !== 'admin') {
      throwJsonError(401, 'Forbidden Access');
    }

    const users = await findAllUsers();

    res.status(200);
    res.send({ data: users });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUsers;
