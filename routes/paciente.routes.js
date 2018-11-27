'use strict'
const express = require('express');
const router = express.Router();

const pacienteCtrl=require('../controllers/paciente.controller');

const autorizacion = require('../middlewares/autenticacion');
const md_trabajador = require('../middlewares/empleados');
const md_admin = require ('../middlewares/admin');
//rutasPaciente
router.post('/add', [autorizacion.autenticado, md_admin.isAdmin],pacienteCtrl.addPaciente);
router.post('/login', pacienteCtrl.loginPaciente);
router.put('/update/:id',[autorizacion.autenticado, md_admin.isAdmin],pacienteCtrl.actualizarPaciente );
router.get('/get', [autorizacion.autenticado],pacienteCtrl.obtenerPacientes);
router.get('/getPaciente/:id',[autorizacion.autenticado],pacienteCtrl.obtenerPaciente);

module.exports = router;