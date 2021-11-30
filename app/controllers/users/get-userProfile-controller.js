'use strict';

const createJsonError = require('../../errors/create-json-error');
const { findUserById } = require('../../repositories/user-repository');

async function getUserProfile(req, res) {
  try {
    const { id } = req.auth;
    const user = await findUserById(id);
    res.status(200).send({ user });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUserProfile;
