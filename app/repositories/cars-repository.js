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

async function addImageByCarId(idCar, imageCar) {
  const pool = await getPool();
  const sql = `
  INSERT INTO carImages(
    name, principal, idCar
    ) VALUES (?, ?, ?)`;
  const [cars] = await pool.query(sql, [imageCar, 0, idCar]);

  return true;
}

async function updateCar(id, car) {
  const { brand, model, year, engine, cv } = car;
  const now = new Date();
  const pool = await getPool();
  const sql = `
  UPDATE cars
  SET brand = ?, model = ?, year = ?, engine = ?, cv = ?, updatedAt = ?
  WHERE id = ? `;
  await pool.query(sql, [brand, model, year, engine, cv, now, id]);
  // await pool.query(sql, [
  //   ...Object.values(car)
  //   now,
  //   id,
  // ]); // LO MISMO PERO PARA OBJETOS MAS LARGOS (EL OBJETO TIENE QUE ESTAR ORDENADO IGUAL QUE LA TABLA)
  return true;
}

module.exports = {
  findAllCars,
  findCarById,
  addImageByCarId,
  updateCar,
};
