'use strict'
const historiaM  = require('../models/historiaM');
const moment = require('moment');


function addHistoriaM(req,res){
    const historia = req.body; 
    console.log(historia)
    if(!historia.idPaciente || !historia.respiracion || !historia.estatura || !historia.peso || !historia.presionArt || !historia.glucosa || !historia.temperatura)
    return res.status(500).send({message: `se presento un problema con los datos `});
    var histMedica = new historiaM();
    histMedica.idPaciente = historia.idPaciente; 
    histMedica.fecha = moment().format('YYYY-MM-DD hh:mm:ss');
    histMedica.respiracion = historia.respiracion;
    histMedica.estatura = historia.estatura;
    histMedica.peso = historia.peso;
    histMedica.presionArt = historia.presionArt;
    histMedica.glucosa = historia.glucosa;
    histMedica.temperatura = historia.temperatura;

    histMedica.save((err,historiaGuardada)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!historiaGuardada) return res.status(500).send({message: `Hubo un error al guardar los datos`});
        return res.status(200).send({historiaG: historiaGuardada});
    })
}

function getHistoriasM(req,res){
    historiaM.find().exec((err,historiasEncontradas)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!historiasEncontradas)return res.status(500).send({message: `No se encontro la historia medica o no existe`});
        return res.status(200).send({historiasM: historiasEncontradas});
    })
}

function getHistoriaPaciente(req,res){
    var id_Paciente = req.params.id;

    historiaM.find({idPaciente:id_Paciente},(err,historiaPacienteEncontrada)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!historiaPacienteEncontrada) return res.status(500).send({message: `La historia no fue encontrada o no existe`});
        return res.status(200).send({historiaPaciente: historiaPacienteEncontrada});
    })
}

module.exports = {
    addHistoriaM,
    getHistoriasM,
    getHistoriaPaciente
};