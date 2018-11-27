'use strict'
const Consulta = require('../models/consulta');
const moment = require('moment');

function addConsulta(req,res){
    const datosConsulta = req.body;
    console.log(datosConsulta);   
    if(!datosConsulta.idPaciente  || !datosConsulta.idHistoria || !datosConsulta.motivo  || !datosConsulta.descripcion || !datosConsulta.observacion ) return res.status(500).send({message: `Error al enviar los datos`});
    var consulta = new Consulta();
    consulta.idHistoria = datosConsulta.idHistoria;
    consulta.idPaciente = datosConsulta.idPaciente; 
    consulta.motivo = datosConsulta.motivo;
    consulta.descripcion = datosConsulta.descripcion;
    consulta.observacion = datosConsulta.observacion;
    consulta.fecha = moment().format('YYYY-MM-DD hh:mm:ss');
    consulta.costo = datosConsulta.costo || null;  
    consulta.status = datosConsulta.status || 'Pendiente'
    consulta.save((err,consultaGuardada)=>{
        if(err) return res.status(500).send({message:`Se presento un error inesperado ${err}`});
        if(!consultaGuardada)return res.status(500).send({message: `No se pudo registrar la consulta`});
        return res.status(200).send({consulta:consultaGuardada});
    })
}

function getConsulta(req,res){
    Consulta.find().exec((err,consultasEncontradas)=>{
        if(err) return res.status(500).send({message: `Se presento un error inesperado ${err}`});
        if(!consultasEncontradas) return res.status(500).send({message: `No se encontraron Consultas`});
        return res.status(200).send({consultas:consultasEncontradas});
    })
}

function getConsultaPaciente(req,res){
    var idConPaciente = req.params.id;
    Consulta.find({idPaciente:idConPaciente}, (err, consultaEncontrada)=>{
        if(err)return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!consultaEncontrada)return res.status(500).send({message:`El paciente no tiene consultas`});
        return res.status(200).send({consultas:consultaEncontrada});
    })

}

function updateConsulta(req,res){
    var idConsulta = req.params.id;
    var datosConsulta = req.body;
    if(req.user.puesto != "Doctor")return res.status(500).send({message:`no tienes permisos para la edicion de este usuario`});
    Consulta.findByIdAndUpdate(idConsulta, datosConsulta, {new: true}, (err, updateConsulta)=>{
        if(err)return res.status(500).send({message:`Se encontro un error innesperado ${err}`});
        if(!updateConsulta)return res.status(500).send({message: `Hubo un error al actualizar los datos dde la consulta`});
        return res.status(200).send({consultaActualizada:updateConsulta});
    })
}

function pagar(req,res){
    var idPaciente = req.params.id;
    var data = {status:'Pagada'};
    Consulta.find({idPaciente:idPaciente},(err,consultas)=>{
        if(err) return res.status(500).send({message:`Error al realizar el pago ${err}`});
        var cantidad = consultas.length;
        consultas.forEach(consulta => {
            Consulta.findByIdAndUpdate(consulta._id, data, {new: true}, (err, updateConsulta)=>{
                if(err) return res.status(500).send({message:`Error al realizar el pago ${err}`});
                cantidad --;
                if(cantidad<1){
                    return res.status(200).send({pago:'ok'});
                }
            })
        });
    })
}

module.exports = {
    addConsulta,
    getConsulta,
    getConsultaPaciente,
    updateConsulta,
    pagar
};