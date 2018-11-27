'use strict'
const express = require('express');
const router = express.Router();

const antecedenteCtrl = require('../controllers/antecedente.controller');

const autorizacion = require('../middlewares/autenticacion');
const md_trabajador = require('../middlewares/empleados');
const md_admin = require ('../middlewares/admin');

//rutasAntecedente
router.post('/add', [autorizacion.autenticado], antecedenteCtrl.addAntecedente); 
router.get('/get', [autorizacion.autenticado],antecedenteCtrl.obtenerAntecedentes);
router.get('/getAntecedente/:id',[autorizacion.autenticado],antecedenteCtrl.obtenerAntecedente);


module.exports = router;