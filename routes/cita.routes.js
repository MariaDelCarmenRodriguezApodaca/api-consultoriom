'use strict'

const express = require('express');
const router = express.Router();

const citaCtrl = require('../controllers/cita.controller');

const autorizacion = require('../middlewares/autenticacion');
const md_trabajador = require('../middlewares/empleados');
const md_admin = require ('../middlewares/admin');

router.post('/add', [autorizacion.autenticado, md_trabajador.isEmpleado], citaCtrl.addCita );
router.get('/get', [autorizacion.autenticado, md_trabajador.isEmpleado], citaCtrl.getCita);
router.get('/get/:id', autorizacion.autenticado, citaCtrl.getCitaPaciente);
router.put('/update/:id', [autorizacion.autenticado, md_trabajador.isEmpleado], citaCtrl.updateCita);
router.get('/getActuales/:idDoctor', [autorizacion.autenticado], citaCtrl.citasActuales);
router.get('/getCanceladas/:idDoctor', [autorizacion.autenticado, md_trabajador.isEmpleado], citaCtrl.citasCanceladas);
router.put('/terminar/:id', [autorizacion.autenticado, md_trabajador.isEmpleado], citaCtrl.updateCita);
router.get('/getRealizadas/:idDoctor', [autorizacion.autenticado, md_trabajador.isEmpleado], citaCtrl.citasRealizadas);
router.put('/reactivar/:id', [autorizacion.autenticado, md_trabajador.isEmpleado], citaCtrl.Reactivar);

module.exports = router;