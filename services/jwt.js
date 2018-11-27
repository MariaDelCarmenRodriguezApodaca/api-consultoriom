'use strict'
//este archivo es para generar token de autenticacion al momento de logearse. es para el controlador login
const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('../config');
const secretToken = config.jwtSecretPwd; //jwtSecretPwd esta en config


exports.createToken = (usuario)=>{ 
    var payload = {
        sub: usuario._id,
        doctor: usuario.doctor || null,
        nombre : usuario.nombre,
        puesto : usuario.puesto || 'paciente', //el paciente no tiene puesto por lo tanto, se le asigna -paciente-
        tel: usuario.tel,
        usuario: usuario.usuario,
        iat: moment().unix(), //fecha de creaciondel token añomesdiasemanahoraminutoysegundo
        exp: moment().add(15, "days").unix() //fechadeExpiracion
    }
    return jwt.encode(payload, secretToken) //encriptatodopayloadysecrettokenyloreturna
}
