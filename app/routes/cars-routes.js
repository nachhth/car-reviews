'use strict';

const express = require('express');
const router = express.Router();
const getCars = require('../controllers/cars/get-cars-controller');
const getCarById = require('../controllers/cars/get-carById-controller');
const validateAuth = require('../middlewares/validate-auth-middlewares');
const createReviewByCarId = require('../controllers/cars/create-review-byCarId-controller');
const getCarReviewsByCarId = require('../controllers/cars/get-reviews-byCarId-controller');
const getAvgRatingByCarId = require('./../controllers/cars/get-avgRatingByCarId-controller');
const uploadCarImageById = require('../controllers/cars/upload-carImageById-controller');
const updateCarById = require('../controllers/cars/update-carById-controller');

// URL's PRIVADAS A PARTIR DEL .all(validateAuth)

router.route('/').get(getCars);
router.route('/:id').get(getCarById);
router.route('/:carId/reviews').get(getCarReviewsByCarId).all(validateAuth).post(createReviewByCarId);
router.route('/:carId/rating').get(getAvgRatingByCarId);
router.route('/:carId/images').all(validateAuth).post(uploadCarImageById);
router.route('/:carId').all(validateAuth).put(updateCarById);

module.exports = router;
