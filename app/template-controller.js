'use strict';

const createJsonError = require('../'); // completar

// require function DB
// schema joi

async function nombreFuncion(req, res) {
  try {
    // VALIDACION PARAMETROS ENTRADA
    // LLAMADA BASE DE DATOS
    // VALIDAR RESULTADO
    res.status(200);
    res.send();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = nombreFuncion;
