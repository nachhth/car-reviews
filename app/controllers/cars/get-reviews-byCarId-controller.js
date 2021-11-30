'use strict';

const joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { findCarById } = require('../../repositories/cars-repository');
const { findReviewsByCarId } = require('../../repositories/reviews-repository');

const schema = joi.number().positive().required();

async function getCarReviewsByCarId(req, res) {
  try {
    const { carId } = req.params;
    await schema.validateAsync(carId);

    const car = await findCarById(carId);
    if (!car) {
      throwJsonError(400, 'Car does not exist');
    }
    const reviews = await findReviewsByCarId(carId);
    res.status(200);
    res.send({ reviews });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCarReviewsByCarId;
