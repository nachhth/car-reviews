'use strict';

const joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { isAdmin } = require('../../helpers/utils');
const { findCarById, updateCar } = require('../../repositories/cars-repository');

const schemaId = joi.number().positive().integer().required();
const schema = joi.object().keys({
  brand: joi.string().min(3).max(20).required(),
  model: joi.string().min(2).max(220).required(),
  year: joi.number().integer().positive().min(1950).max(new Date().getFullYear()),
  engine: joi.string().valid('Diesel', 'Gasolina', 'Híbrido', 'Eléctrico'),
  cv: joi.number().integer().positive().min(40).max(600),
});

async function updateCarById(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);
    const { carId } = req.params;
    await schemaId.validateAsync(carId);

    const car = await findCarById(carId);
    if (!car) {
      throwJsonError(400, 'Car does not exist');
    }

    const { body } = req;
    await schema.validateAsync(body);
    await updateCar(carId, body);

    res.status(200);
    res.send({ message: `${body.brand} car updated` });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateCarById;
