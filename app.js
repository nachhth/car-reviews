'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = process.env;
// RECIBIR DATOS COMO JSON EN EL BODY
app.use(express.json());

const carsRouter = require('./app/routes/cars-routes');
const usersRouter = require('./app/routes/user-routes');

// GET  api/v1/cars
// GET  api/v1/cars/12
app.use('/api/v1/cars/', carsRouter);
// POST api/v1/users
app.use('/api/v1/users/', usersRouter);
// GET api/v1/users/activation
app.use('/api/v1/users/activation', usersRouter);

app.listen(PORT, () => console.log('Running', PORT));
