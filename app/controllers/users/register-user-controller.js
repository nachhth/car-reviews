'use strict';
const { createUSer, findUserByMail } = require('../../repositories/user-repository');

const joi = require('joi');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const throwJsonError = require('../../errors/throw-jason-error');
const createJsonError = require('../../errors/create-json-error');
const { findUserByEmail, createUser } = require('../../repositories/user-repository');
const { sendMailRegister } = require('../../helpers/mail-smtp');

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
      // const error = new Error('Email already in use');
      // error.status = 400; // 409 - Conflict
      // throw error; // SE REMPLAZA ESTE CODIGO POR LA FUNCION:
      throwJsonError(400, 'Email already in use');
    }

    // crear el Hash para el password
    const passwordHash = await bcrypt.hash(password, 12);
    // crea el verification code
    const verificationCode = randomstring.generate(64);
    // crear Object user con los campos
    const userDB = { name, email, passwordHash, verificationCode };
    // llamamos a la base de datos - createUser
    const userId = await createUser(userDB);
    // enviar mail de verificacion cuenta
    await sendMailRegister(name, email, verificationCode);
    // console.log(`http://localhost:3000/api/v1/users/activation?code=${verificationCode}`);
    // res.send();
    res.status(201);
    res.json({ id: userId });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = registerUser;
