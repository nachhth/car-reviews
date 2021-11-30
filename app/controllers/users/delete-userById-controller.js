'use strict';

const joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { isAdmin } = require('../../helpers/utils');
const { findUserById, removeUserById } = require('../../repositories/user-repository');

const schema = joi.number().positive().required();

async function deleteUserById(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);
    const { id } = req.params;
    await schema.validateAsync(id);
    const user = await findUserById(id);

    if (!user) {
      throwJsonError(400, 'User does not exist');
    }
    if (user.role === 'admin') {
      throwJsonError(403, 'Forbidden action');
    }
    await removeUserById(id);
    res.status(204).send();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = deleteUserById;
