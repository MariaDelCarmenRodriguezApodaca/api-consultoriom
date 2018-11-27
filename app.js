'use strict'
const express  =  require ('express');
const bodyParser = require('body-parser'); //para los formatos
const morgan = require('morgan');

// const routTrabajador = require('./routes/trabajador.routes');


const Paciente= require('./models/paciente');
const Trabajador = require('./models/trabajador'); 
const bcryp = require('bcrypt-nodejs');
const jwt = require('./services/jwt');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //todos convertidos a json
app.use(express.json());
app.use(morgan('dev'));
//importacion de rutas
let trabajadorRoutes = require ('./routes/trabajador.routes');
let pacienteRoutes = require ('./routes/paciente.routes');
let antecedenteRoutes = require('./routes/antecedente.routes');
let consultaRoutes = require('./routes/consulta.routes');
let historiaMedicaRoutes = require('./routes/historiaMedica.routes');
let citaRoutes = require ('./routes/cita.routes'); 
let recetaMRoutes = require('./routes/receta.routes');
let tratamientoRoutes = require('./routes/tratamiento.routes');


//configurar cabeceras y cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept, Access-Control-Allow-Request-Method'),
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE'),
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
});



app.post('/login', (req, res) => {
    var data = req.body;
    if (data.usuario && data.password) {
        var usuario = data.usuario.toLowerCase();
        var password = data.password;
        Paciente.findOne({ usuario: usuario }, (err, locatedCliente) => {
            if (!err) {
                if (locatedCliente) {
                    bcryp.compare(password, locatedCliente.password, (err, check) => {
                        if (!err) {
                            if (check) {
                                //comprobar que solicite el token 
                                if (data.getToken == 'true') {
                                    //generar y devolver el token 
                                    return res.status(200).send({
                                        usuario: locatedCliente,
                                        token: jwt.createToken(locatedCliente)
                                    })
                                } else return res.status(200).send({ usuario: locatedCliente });
                            } else return res.status(500).send({ message: 'La password es incorrecta' });
                        } else return res.status(500).send({ message: `Error al comprobar password ${err}` });
                    }) // fin del compare de bcryp
                } else {
                    Trabajador.findOne({ usuario: usuario }, (err, locatedEmpleado) => {
                        if (!err) {
                            if (locatedEmpleado) {
                                bcryp.compare(password, locatedEmpleado.password, (err, check) => {
                                    if (!err) {
                                        if (check) {
                                            //comprobar que solicite el token 
                                            if (data.getToken == 'true') {
                                                //generar y devolver el token 
                                                return res.status(200).send({
                                                    usuario: locatedEmpleado,
                                                    token: jwt.createToken(locatedEmpleado)
                                                })
                                            } else return res.status(200).send({ usuario: locatedEmpleado });
                                        } else return res.status(500).send({ message: 'La password es incorrecta' });
                                    } else return res.status(500).send({ message: `Error al comprobar password ${err}` });
                                }) // fin del compare de bcryp
                            } else return res.status(404).send({ message: 'El usuario no existe' });
                        } else return res.status(500).send({ message: `Error al localizar usuario ${err}` })
                    }) //fin de la busqueda de usuario
                }
            } else return res.status(500).send({ message: `Error al localizar usuario ${err}` })
        }) //fin de la busqueda de usuario
    } else return res.status(500).send({ message: 'No se han enviado todos los datos' })
});

app.use('/trabajador', trabajadorRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/antecedentes', antecedenteRoutes);
app.use('/consulta', consultaRoutes);
app.use('/historiaMedica', historiaMedicaRoutes);
app.use('/cita', citaRoutes); 
app.use('/recetaM', recetaMRoutes);
app.use('/tratamiento', tratamientoRoutes);

module.exports = app;