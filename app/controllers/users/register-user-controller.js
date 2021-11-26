'use strict';

const joi = require('joi');
const createJsonError = require('../../infrastructure/database');
const { createUser } = require('../../repositories/user-repository');

const schema = joi.object().keys({
  name: joi.string().min(4).max(120).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).max(20).required(),
  verifyPassword: joi.ref('password'),
});

async function registerUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { name, email, password } = body;
    const user = await findUserByEmail(email);
    if (user) {
      const error = new Error('Email already in use');
      error.status = 400; // 409 - Conflict
      throw error;
    }
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = registerUser;
