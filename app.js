'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = process.env;
// RECIBIR DATOS COMO JSON EN EL BODY
app.use(express.json());

const carsRouter = require('./app/routes/cars-routes');

// GET  api/v1/cars
// GET  api/v1/cars/12
app.use('/api/v1/cars/', carsRouter);

app.listen(PORT, () => console.log('Running', PORT));
