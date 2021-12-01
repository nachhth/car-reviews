'use strict';

const joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { findCarById } = require('../../repositories/cars-repository');
const { getRating } = require('../../repositories/reviews-repository');

const schema = joi.number().positive().integer().required();

async function getAvgRatingByCarId(req, res) {
  try {
    const { carId } = req.params;
    await schema.validateAsync(carId);

    const car = await findCarById(carId);

    if (!car) {
      throwJsonError(400, 'Car does not exist');
    }

    const rating = await getRating(carId);

    res.status(200);
    res.send(rating);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getAvgRatingByCarId;
