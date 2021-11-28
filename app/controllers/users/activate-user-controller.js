'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { activateUser, getUserByVerificationCode } = require('../../repositories/user-repository');
const { sendMailCorrectValidation } = require('../../helpers/mail-smtp');
//api/v1/users/activation?code=akjsdghkajdf

async function validateUser(req, res) {
  try {
    const { code } = req.query;
    if (!code) {
      throwJsonError(400, 'Code not valid');
    }
    const isActivated = await activateUser(code);

    if (!isActivated) {
      throwJsonError(400, 'Couldnt activate. Code not valid');
    }

    const user = await getUserByVerificationCode(code);
    const { name, email } = user;

    await sendMailCorrectValidation(name, email);

    res.status(200);
    res.send({ message: 'Succesfully activated account' });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = validateUser;
