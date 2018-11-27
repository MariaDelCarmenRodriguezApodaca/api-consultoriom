'use strict'

const Receta = require('../models/recetaM');
const moment = require('moment');

function addReceta(req,res){
    const datosReceta = req.body;
    console.log(datosReceta);
    if(!datosReceta.idConsulta || !datosReceta.idPaciente || !datosReceta.medicina)return res.status(500).send({message: `Se presento un error innesperado`});
    
    var recetaM = new Receta();
    recetaM.idConsulta = datosReceta.idConsulta;
    recetaM.idPaciente = datosReceta.idPaciente;
    recetaM.medicina = datosReceta.medicina;  
    recetaM.fecha =  moment().format('YYYY-MM-DD hh:mm:ss');
    
    recetaM.save((err, recetaGuardada)=>{
        if(err)return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!recetaGuardada) return res.status(500).send({message:`La receta no se pudo guardar con éxito`});
        return res.status(200).send({receta:recetaGuardada});
    })
}

function getReceta(req,res){
    Receta.find((err, recetasEncontradas)=>{
        if(err)return res.status(500).send({message: `Se presento un error innesperado ${err}`});
        if(!recetasEncontradas)return res.status(500).send({message: `Las recetas no existen`});
        return res.status(200).send({recetas: recetasEncontradas});
    })

}

function RecetaPaciente(req,res){
    const idReceta = req.params.id;

    Receta.find({idPaciente:idReceta}, (err, recetaEncontrada)=>{
        if(err)return res.status(500).send({message:`Se presento un error innesperado ${err}`});
        if(!recetaEncontrada) return res.status(500).send({message: `La receta solicitada no existe o hubo un error en su búsqueda`});
        return res.status(200).send({recetas: recetaEncontrada});
    })
}


module.exports = {
    addReceta,
    getReceta,
    RecetaPaciente
}