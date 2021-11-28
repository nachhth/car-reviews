'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { findCarById } = require('../../repositories/cars-repository');

async function getCarById(req, res) {
  try {
    const { id } = req.params;

    // si id es un numero
    const car = await findCarById(id);

    if (car.length === 0) {
      throwJsonError(400, 'Párametro no válido');
    }
    res.status(200);
    res.send(car); // EQUIVALENTE A -> res.json(car);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCarById;
