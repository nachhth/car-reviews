'use strict';

const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { findUserByEmail } = require('../../repositories/user-repository');

const schema = joi.object().keys({
  username: joi.string().email().required(),
  password: joi.string().min(4).max(20).required(),
});

async function loginUser(req, res) {
  try {
    const { body } = req;
    // validamos los datos
    await schema.validateAsync(body);
    const { username, password } = body;

    const user = await findUserByEmail(username);

    if (!user) {
      throwJsonError(403, 'User not found');
    }

    const { id, name, role, password: passwordHash, verifiedAt } = user;
    const isValidPassword = await bcrypt.compare(password, passwordHash);
    if (!isValidPassword) {
      throwJsonError(403, 'invalid password');
    }

    // comprobamos que el usuario esta verificado

    if (!verifiedAt) {
      // logica de reenviar el email con el codigo que ahora no vamos a rellenar
      throwJsonError(401, 'Verification of account is needed to login. Check your email for instructions');
    }

    const { JWT_SECRET } = process.env;

    const tokenPayload = { id, name, role, ejemplo: 'asdf' };
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: '20min',
    });

    const response = {
      accessToken: token,
      expiresIn: '20m',
    };

    res.status(200);
    res.send(response);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = loginUser;
