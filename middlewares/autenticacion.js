'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('../config');
var secretToken = config.jwtSecretPwd;

exports.autenticado = (req, res, next)=>{
    if(req.headers.authorization){
        var token = req.headers.authorization.replace("\"",''); //reemplazamos dobles por simples
        try {
            var payload = jwt.decode(token, secretToken); //payload es el token decodificado
            if(payload.exp <= moment.unix()) return res.status(500).send({menssage:`El token ha caducado`});
        } catch (ex) {
            console.log(token);
            return res.status(500).send({menssage: `El token no es válido`});
        }
        req.user = payload;
        next();
    }else return res.status(500).send({menssage: `No se encontro la cabecera`});
}

