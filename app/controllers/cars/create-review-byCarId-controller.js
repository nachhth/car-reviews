'use strict';

const joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { findCarById } = require('../../repositories/cars-repository');
const { addReview } = require('../../repositories/reviews-repository');

const schema = joi.number().positive().required();
const schemaBody = joi.object().keys({
  comment: joi.string().min(5).max(255).required(),
  rating: joi.number().integer().min(0).max(5).required(),
});

async function createReviewByCarId(req, res) {
  try {
    const { id } = req.auth;
    const { carId } = req.params;
    await schema.validateAsync(carId);
    const { body } = req;
    await schemaBody.validateAsync(body);

    const car = findCarById(carId);
    if (!car) {
      throwJsonError(400, 'Car does not exist');
    }

    const { comment, rating } = body;
    const reviewId = await addReview(id, carId, comment, rating);

    res.status(201);
    res.send({ reviewId });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createReviewByCarId;
