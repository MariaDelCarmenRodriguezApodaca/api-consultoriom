'use strict'
const express = require('express');
const router = express.Router();

const consultaCtrl = require('../controllers/consulta.controller');

const autorizacion = require('../middlewares/autenticacion');
const md_trabajador = require('../middlewares/empleados');
const md_admin = require ('../middlewares/admin');

router.post('/add', [autorizacion.autenticado, md_trabajador.isEmpleado], consultaCtrl.addConsulta);
router.get('/get', [autorizacion.autenticado, md_trabajador.isEmpleado], consultaCtrl.getConsulta);
router.get('/getConsultaPaciente/:id', autorizacion.autenticado, consultaCtrl.getConsultaPaciente);
router.put('/update/:id', [autorizacion.autenticado, md_admin.isAdmin], consultaCtrl.updateConsulta);
router.put('/pagar/:id',[autorizacion.autenticado,md_admin.isAdmin],consultaCtrl.pagar);

module.exports = router;