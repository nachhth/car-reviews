'use strict';

const getPool = require('../infrastructure/database');

async function findAllCars() {
  const pool = await getPool();
  const sql = 'SELECT * FROM cars';
  const [cars] = await pool.query(sql);

  return cars;
}

async function findCarById(id) {
  // findCarById(id, model, brand) {
  const pool = await getPool();
  const sql = 'SELECT * FROM cars WHERE cars.id = ?';
  //const sql = `SELECT * FROM cars where model= ? AND brand=?`;
  const [car] = await pool.query(sql, id);
  //const [car] = await pool.query(sql, [model,brand]);
  return car;
}

module.exports = {
  findAllCars,
  findCarById,
};