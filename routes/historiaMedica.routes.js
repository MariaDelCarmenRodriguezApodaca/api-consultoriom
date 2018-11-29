'use strict'
const express = require('express');
const router = express.Router();

const historiaMedica = require('../controllers/historiaMedica.controller');

const autorizacion = require('../middlewares/autenticacion');
const md_trabajador = require('../middlewares/empleados');
const md_admin = require ('../middlewares/admin');

//rutas
router.post('/add', [autorizacion.autenticado, md_trabajador.isEmpleado], historiaMedica.addHistoriaM);
router.get('/get',  [autorizacion.autenticado], historiaMedica.getHistoriasM);
router.get('/getHistoria/:id', [autorizacion.autenticado], historiaMedica.getHistoriaPaciente);
module.exports = router;