'use strict';

const createJsonError = require('../../errors/create-json-error');
const { findCarById } = require('../../repositories/cars-repository');

async function getCarById(req, res) {
  try {
    const { id } = req.params;

    // si id es un numero
    const car = await findCarById(id);

    if (car.length === 0) {
      const error = new Error('Parámetro no válido');
      error.status = 400;

      throw error;
    }
    res.status(200);
    res.send(car); // EQUIVALENTE A -> res.json(car);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCarById;
