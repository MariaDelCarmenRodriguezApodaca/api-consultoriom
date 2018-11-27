'use strict'
const Paciente = require ('../models/paciente');
const bcryp = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function addPaciente(req,res){
    const body = req.body;
    console.log(body);
    let doctor = req.user.sub || null;
    if(!body.nombre || !body.fechaN || !body.sexo || !body.dirPaciente || !body.tel || !body.nomRef || !body.telRef || !body.religion || !body.edoCivil  || !body.usuario || !body.password)
    return res.status(500).send({message: 'Los datos no se enviaron correctamente'});
    var paciente = new Paciente();
    paciente.doctor = doctor;
    paciente.nombre = body.nombre;
    paciente.fechaN = body.fechaN;
    paciente.edad   = body.edad;
    paciente.sexo = body.sexo;
    paciente.dirPaciente = body.dirPaciente;
    paciente.tel = body.tel;
    paciente.nomRef  = body.nomRef;
    paciente.telRef = body.telRef;
    paciente.religion = body.religion;
    paciente.edoCivil = body.edoCivil;
    paciente.hijos = body.hijos || 0;
    paciente.usuario = body.usuario; 
    bcryp.hash(body.password,null,null,(err,hash)=>{
        if(err) return res.status(500).send({message: `Se presento un error al encriptar contraseña ${err}`});
        paciente.password = hash;
        paciente.save((err, pacienteGuardado)=>{
            if(err) return res.status(500).send({message:`Se presento un error al guardar al paciente`});
            if(!pacienteGuardado) return res.status(403).send({message: `No se pudo guardar el paciente`});
            res.status(200).send({paciente:pacienteGuardado});
        })
    })    
}

function actualizarPaciente(req, res){
    var idPaciente = req.params.id;
    var datosPaciente = req.body;

    console.log(req.body);
    if(req.user.puesto != "Doctor" && req.user.puesto != "Asistente") return res.status(500).send({message: `No tienes los permisos necesarios para actualizar los datos`});//aqui dice que el doctor y el asistente pueden editar los datos del paciente
    if(datosPaciente.password){
        bcryp.hash(datosPaciente.password,null,null,(err,hash)=>{
            if(err) return res.status(500).send({message:`Hubo un problema con el hash ${err}`});
            datosPaciente.password = hash;
            Paciente.findByIdAndUpdate(idPaciente, datosPaciente,{new:true}, (err,pacienteActualizado)=>{
                if(err) return res.status(500).send({message: `Se presento un error inesperado`});
                if(!pacienteActualizado) return res.status(500).send({message:`No se pudo actualizar el dato deseado`});
                return res.status(200).send({paciente:pacienteActualizado});
            })
        })
    }else{
        Paciente.findByIdAndUpdate(idPaciente, datosPaciente,{new:true}, (err,pacienteActualizado)=>{
            if(err) return res.status(500).send({message: `Se encontro un error inesperado`});
            if(!pacienteActualizado) return res.status(500).send({message:`Hubo un problema al actualizar al paciente ${err}`});
            return res.status(200).send({paciente:pacienteActualizado});
        })
    }

};

function obtenerPaciente(req,res){
    var idpaciente = req.params.id;

    Paciente.findById(idpaciente).populate({path:'doctor'}).exec((err, pacienteEncontrado)=>{
        if(err) return res.status(500).send({message: `Error inesperado ${err}`});
        if(!pacienteEncontrado) return res.status(404).send({message:`Paciente no encontrado`});
        return res.status(200).send({paciente:pacienteEncontrado});
    })

}

function obtenerPacientes(req,res){
    var doctor;
    if(req.user.puesto != 'Doctor'){
        doctor = req.user.doctor;
    }else {
        doctor = req.user.sub;
    }

    Paciente.find({doctor:doctor}).exec((err,pacientesEncontrados)=>{
        if(err) return res.status(500).send({message:`Error inesperado ${err}`});
        if(!pacientesEncontrados) return res.status(500).send({message:`No se encontraron pacientes registrados`});
        return res.status(200).send({pacientes:pacientesEncontrados});
    })
}

function loginPaciente(req,res){
    var datosPaciente = req.body;
    console.log(req.body);
    if(!datosPaciente.usuario || !datosPaciente.password) return res.status(500).send({message: `No se mandaron todos los datos`});
    Paciente.findOne({usuario: datosPaciente.usuario}, (err,pacienteEncontrado)=>{
        if(err) return res.status(500).send({message: `Error inesperado`});
        if(!pacienteEncontrado) return res.status(404).send({message: `Paciente no se encontro o no existe`});
        
        bcryp.compare(datosPaciente.password, pacienteEncontrado.password,(err,pwdCoiniciden)=>{
            if(err) return res.status(500).send({message:`Error inesperado ${err}`});
            if(!pwdCoiniciden) return res.status(500).send({message:`Las contraseñas no coinciden`});
            

            var token = jwt.createToken(pacienteEncontrado);
            return res.status(200).send({paciente:pwdCoiniciden, token:token});
        })
    })
}

module.exports = {
    addPaciente,
    actualizarPaciente,
    obtenerPaciente,
    loginPaciente,
    obtenerPacientes
};