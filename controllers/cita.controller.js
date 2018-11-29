'use strict'

const Cita =  require('../models/cita');
const moment = require('moment');

//Pendiente, Realizado, Cancelado
function addCita(req, res){
    const datosCita = req.body;
    if( !datosCita.idPaciente || !datosCita.descripcion || !datosCita.hora || !datosCita.fecha || !datosCita.idDoctor)
    return res.status(500).send({message: `Se presento un error ${err}`});

    var cita = new Cita(); 
    cita.idDoctor = datosCita.idDoctor;
    cita.idPaciente = datosCita.idPaciente;
    cita.descripcion = datosCita.descripcion;
    cita.fecha =  datosCita.fecha;
    cita.hora = datosCita.hora;
    cita.turno = datosCita.turno;
    cita.status = 'Pendiente';

    cita.save((err,citaGuardada)=>{
        if(err) return res.status(500).send({message:`Se presento un error innesperado ${err}`});
        if(!citaGuardada) return res.status(500).send({message: `La cita no pudo ser guardada con éxito`});
        return res.status(200).send({cita: citaGuardada});
    })
}

function getCita(req,res){
    let doctor ='';
    if(req.user.puesto == 'Doctor'){
        doctor = req.user.sub; //enElSubtenemoselID
    }else{
        doctor = req.user.doctor;
    }
    Cita.find({idDoctor:doctor}).populate({path:'idPaciente'}).exec((err,citasGuardadas)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!citasGuardadas) return res.status(500).send({message: `No se encontraron citas o no existen`});
        return res.status(200).send({citasGuardadas:citasGuardadas});
    })
}

function getCitaPaciente(req,res){
    var id_paciente = req.params.id;
    Cita.find({idPaciente:id_paciente}).populate({path:'idPaciente'}).exec((err, citaPacienteGuardada)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado`});
        if(!citaPacienteGuardada) return res.status(500).send({message: `Este paciente no tiene citas`});
        return res.status(200).send({citas: citaPacienteGuardada});
    })
}

function updateCita(req,res){
    var id_cita = req.params.id;
    var datosCita = req.body;
    Cita.findByIdAndUpdate(id_cita, datosCita ,(err, citaActualizada)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!citaActualizada) return res.status(500).send({message: `Hubo un error al actualizar la cita del paciente`});
        return res.status(200).send({cita: citaActualizada});
    })

}

function terminarCita(req,res){
    var id_cita = req.params.id;
    var status = req.body.status;
    Cita.findByIdAndUpdate(id_cita, {status:status} ,(err, citaActualizada)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!citaActualizada) return res.status(500).send({message: `Hubo un error al actualizar la cita del paciente`});
        return res.status(200).send({cita: citaActualizada});
    })

}

function Reactivar(req,res){
    var id_cita = req.params.id;
    Cita.findByIdAndUpdate(id_cita, {status:'Pendiente'} ,(err, citaActualizada)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!citaActualizada) return res.status(500).send({message: `Hubo un error al actualizar la cita del paciente`});
        return res.status(200).send({cita: citaActualizada});
    })

}

function citasActuales(req,res){
    let idDoctor=req.params.idDoctor;
    let hoy = moment().format('YYYY-MM-DD');
    hoy = String(hoy);
    Cita.find({fecha:hoy, status:'Pendiente',idDoctor:idDoctor}).populate({path:'idPaciente'}).exec((err, citasActuales)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!citasActuales) return res.status(500).send({message: `No se encontraron citas`});
        return res.status(200).send({citas:citasActuales});
    })
}

function citasCanceladas(req,res){
    let idDoctor=req.params.idDoctor;
    let hoy = moment().format('YYYY-MM-DD');
    hoy += '';
    Cita.find({fecha:hoy,status:'Cancelada',idDoctor:idDoctor}).populate({path:'idPaciente'}).exec((err,citasGuardadas)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!citasGuardadas) return res.status(500).send({message: `No se encontraron citas o no existen`});
        return res.status(200).send({canceladas:citasGuardadas});
    })
}

function citasRealizadas(req,res){
    let idDoctor=req.params.idDoctor;
    let hoy = moment().format('YYYY-MM-DD');
    hoy += '';
    Cita.find({fecha:hoy,status:'Realizada',idDoctor:idDoctor}).populate({path:'idPaciente'}).exec((err,citasGuardadas)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!citasGuardadas) return res.status(500).send({message: `No se encontraron citas o no existen`});
        return res.status(200).send({realizadas:citasGuardadas});
    })
}


module.exports = {
    addCita,
    getCita,
    getCitaPaciente,
    updateCita,
    citasActuales,
    citasCanceladas,
    citasRealizadas,
    Reactivar,
    terminarCita
};