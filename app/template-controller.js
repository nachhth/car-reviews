'use strict';

const createJsonError = require('./errors/create-json-error');

// require function DB
// schema joi

async function nombreFuncion(req, res) {
  try {
    // VALIDACION PARAMETROS ENTRADA
    // LLAMADA BASE DE DATOS
    // VALIDAR RESULTADO
    res.send();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = nombreFuncion;
