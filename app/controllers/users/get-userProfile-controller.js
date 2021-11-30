'use strict';

const joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { findAllUsers, findUserById } = require('../../repositories/user-repository');

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
