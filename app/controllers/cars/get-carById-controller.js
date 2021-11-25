'use strict';

const { findCarById } = require('../../repositories/cars-repository');

async function getCarById(req, res) {
  try {
    const { id } = req.params;

    // si id es un numero
    const car = await findCarById(id);

    if (car.length === 0) {
      throw new Error('ERROR');
    }
    res.status(200);
    res.send(car); // EQUIVALENTE A -> res.json(car);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
}

module.exports = getCarById;
