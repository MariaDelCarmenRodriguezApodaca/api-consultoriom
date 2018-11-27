'use strict'
var app = require ('./app');
var config = require ('./config');

const mongoose = require("mongoose");  

mongoose.connect(config.hostBD, { useNewUrlParser: true })
    .then(db=>{
        app.listen(config.PORT,()=>{
            console.log(`Servidor conectado con éxito en el puerto:${config.PORT}`);
        });
    })
    .catch(err=>{
        console.err("Hubo un error en la conexion a la BD", err);
    })