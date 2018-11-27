'use strict'

const express = require('express');
const router = express.Router();

const recetaMCtrl = require('../controllers/receta.controller');

const autorizacion = require('../middlewares/autenticacion');
const md_trabajador = require('../middlewares/empleados');
const md_admin = require ('../middlewares/admin');

router.post('/add', [autorizacion.autenticado, md_admin.isAdmin], recetaMCtrl.addReceta);
router.get('/get', [autorizacion.autenticado, md_trabajador.isEmpleado], recetaMCtrl.getReceta);
router.get('/get/:id', autorizacion.autenticado, recetaMCtrl.RecetaPaciente);

module.exports = router;