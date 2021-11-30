'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { isAdmin } = require('../../helpers/utils');
const { findAllUsers } = require('../../repositories/user-repository');

async function getUsers(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const users = await findAllUsers();

    res.status(200);
    res.send({ data: users });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUsers;
