const Trabajador = require('../models/trabajador');
const bcryp = require('bcrypt-nodejs'); //se importa para encriptar un string, en mi caso, la pwsd.
const jwt = require('../services/jwt');

 //hash es la password encriptada

 //status: Activo, Inactivo
function addTrabajador(req,res){
    const body = req.body;
    if(!body.nombre || !body.nss || !body.tel || !body.usuario || !body.password)
        return res.status(500).send({message: 'No se enviaron los datos correctamente '});
    var trabajador = new Trabajador();
    trabajador.doctor = body.doctor || null;
    trabajador.nombre = body.nombre;
    trabajador.puesto = body.puesto || 'Asistente'; 
    trabajador.tel = body.tel;
    trabajador.usuario = body.usuario;
    trabajador.nss = body.nss;
    trabajador.status = body.status || 'Activo'
    Trabajador.findOne({nss: body.nss}, (err, trabajadorEncontrado)=>{
        if(err) return res.status(500).send({message: `No se encontro el trabajador`});
        if(trabajadorEncontrado) return res.status(500).send({message:`El usuario ya existe`});
        if(!trabajadorEncontrado){
            bcryp.hash(body.password, null, null, (err, hash)=>{
                if(err) return res.status(500).send({message:`Error al encriptar la contrasenia ${err}`});
                if(hash) {
                    trabajador.password = hash;
                    trabajador.save((err, trabajadorGuardado)=>{
                        return res.status(200).send({trabajador:trabajadorGuardado});
                    });
                }
            })
        }
    })
}

function loginTrabajador(req,res){
    var body = req.body; 
    if(!body.usuario || !body.password) return res.status(500).send({message: `No se recibieron los datos correctamente`});
    Trabajador.findOne({usuario:body.usuario}, (err, trabajadorEncontrado)=>{
        if(err) return res.status(500).send({message: `Error encontrado ${err}`});
        if(!trabajadorEncontrado) return res.status(500).send({message: `El trabajador con ese usuario no existe`});

        bcryp.compare( body.password,trabajadorEncontrado.password,(err, coninciden)=>{
            if(err) return res.status(500).send({message: `Las contraseñas no coinciden`});
            if(!coninciden) return res.status(500).send({message: `La contraseña es incorrecta`});
            
            var token = jwt.createToken(trabajadorEncontrado);
            res.status(200).send({trabajador: trabajadorEncontrado, token:token});
        })
    })
}

function updateTrabajador(req,res){ 
    var idTrabajador = req.params.id; //parametros y el parametro
    var datosTrabajador = req.body; //en el body vienen los datos
    if(req.user.puesto != "Doctor")return res.status(500).send({message:`no tienes permisos para la edicion de este usuario`});
    Trabajador.findByIdAndUpdate(idTrabajador, datosTrabajador,{new: true}, (err, updateTrabajador)=>{
        if(err) return res.status(500).send({message:`Se encontro un error ${err}`});
        if(!updateTrabajador) return res.status(500).send({message:`se presento un error desconocido`});
        return res.status(200).send({trabajador:updateTrabajador});
    })
};

function getTrabajadores(req,res){
    let doctor = req.user.sub;
    Trabajador.find({puesto:'Asistente', doctor:doctor}).exec((err, asistente)=>{
        if(err) return res.status(500).send({message:`Se presento un error en la busqueda`});
        if(!asistente) return res.status(404).send({message:`Datos no encontrados`});
        return res.status(200).send({asistente:asistente});
    })
}

module.exports = {
    addTrabajador,
    loginTrabajador,
    updateTrabajador,
    getTrabajadores
};