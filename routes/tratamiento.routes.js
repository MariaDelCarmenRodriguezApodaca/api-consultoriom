'use strict'

const express = require('express');
const router = express.Router();

const tratamientoCtrl = require('../controllers/tratamiento.controller');

const autorizacion = require ('../middlewares/autenticacion');
const md_trabajador = require('../middlewares/empleados');
const md_admin = require ('../middlewares/admin');

router.post('/add', autorizacion.autenticado, tratamientoCtrl.addTratamiento);
router.get('/get', [autorizacion.autenticado, md_admin.isAdmin] , tratamientoCtrl.getTratamiento);
router.get('/get/:id', [autorizacion.autenticado, md_admin.isAdmin], tratamientoCtrl.getTreatamientoId);

module.exports = router;