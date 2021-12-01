'use strict';

const joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const uploadImage = require('../../helpers/upload-image');
const { isAdmin } = require('../../helpers/utils');

const schema = joi.number().positive().integer().required();

async function uploadCarImageById(req, res) {
  try {
    const { carId } = req.params;
    await schema.validateAsync(carId);

    const { role } = req.auth;
    isAdmin(role);

    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, 'No file detected or empty');
    }
    // imageCar es el nombre de la variable que usamos en el postman
    const { imageCar } = files;
    if (!imageCar) {
      throwJsonError(400, 'File not valid');
    }

    if (!imageCar.mimetype.startsWith('image')) {
      throwJsonError(400, 'File format not valid');
    }

    const { PATH_CAR_IMAGE } = process.env;
    await uploadImage({
      imageData: imageCar.data,
      destination: `${PATH_CAR_IMAGE}/${carId}`,
      width: 300,
      height: 300,
      codImage: carId,
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadCarImageById;
