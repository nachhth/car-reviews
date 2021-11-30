'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const { PORT } = process.env;
// RECIBIR DATOS COMO JSON EN EL BODY
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const carsRouter = require('./app/routes/cars-routes');
const usersRouter = require('./app/routes/user-routes');

app.use('/api/v1/cars/', carsRouter);

app.use('/api/v1/users/', usersRouter);

app.listen(PORT, () => console.log('Running', PORT));
