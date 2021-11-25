'use strict';

const { findAllCars } = require('../../repositories/cars-repository');

async function getCars(req, res) {
  try {
    const cars = await findAllCars();

    res.status(200);
    res.send({ data: cars });
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
}

module.exports = getCars;
