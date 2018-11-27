'use strict'

const Tratamiento = require('../models/tratamiento');

function addTratamiento(req,res){
    const datosTratamiento = req.body;

    if(!datosTratamiento.idConsulta || !datosTratamiento.descripcion)return res.status(500).send({message: `Se presento un error innesperaod ${err}`});
    var  tratamiento = new Tratamiento();

    tratamiento.idConsulta = datosTratamiento.idConsulta;
    tratamiento.descripcion = datosTratamiento.descripcion;

    tratamiento.save((err, tratamientoGuardado)=>{
        if(err) return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!tratamientoGuardado)return res.status(500).send({message: `Hubo un error al guardar el tratamiento`});
        return res.status(200).send({tratamiento: tratamientoGuardado});
    })
}

function getTratamiento(req,res){
    Tratamiento.find((err, tratamientoEncontrado)=>{
        if(err)return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!tratamientoEncontrado)return res.status(500).send({message: `Los tratamientos no existen`});
        return res.status(200).send({tratamiento: tratamientoEncontrado});
    })

}

function getTreatamientoId(req,res){
    const idTratamiento = req.params.id;

    Receta.findOne({id_Tratamiento:idTratamiento}, (err, tratamientoPaciente)=>{
        if(err)return res.status(500).send({message:`Se presento un error innesperado ${err}`});
        if(!tratamientoPaciente) return res.status(500).send({message: `El tratamiento no existe o hubo un error en su búsqueda`});
        return res.status(200).send({tratamiento: tratamientoPaciente});
    })
}
module.exports = {
    addTratamiento,
    getTratamiento,
    getTreatamientoId
};