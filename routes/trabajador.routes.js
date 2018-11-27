'use strict'
const express = require ('express');
const router = express.Router();

const trabajadorCtrl=require('../controllers/trabajador.controller');

const autorizacion = require('../middlewares/autenticacion');
const md_admin = require("../middlewares/admin");

//router.get('/', trabajadorCtrl.getTrabajadores); //rutaParaObtenerTrabajadores
//rutasTrabajador
router.post('/add',trabajadorCtrl.addTrabajador); // 
router.post('/login', trabajadorCtrl.loginTrabajador);
router.put('/update/:id',[autorizacion.autenticado, md_admin.isAdmin],trabajadorCtrl.updateTrabajador);
router.get('/getasistente', [autorizacion.autenticado, md_admin.isAdmin],trabajadorCtrl.getTrabajadores);




module.exports = router;