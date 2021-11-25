'use strict';

const cars = [
  {
    id: 1,
    brand: 'Seat',
    model: 'Ibiza',
    year: 2019,
    engine: 'Diesel',
    cv: 60,
  },
  {
    id: 2,
    brand: 'Fiat',
    model: 'Panda',
    year: 2020,
    engine: 'Diesel',
    cv: 80,
  },
];

function findAllCars() {
  // const sql='SELECT * FROM cars';
  return cars;
}

function findCarById(id) {
  // const sql= 'SELECT * FROM cars WHERE id = id';
  return cars.find((car) => car.id === +id);
}

module.exports = {
  findAllCars,
  findCarById,
};
