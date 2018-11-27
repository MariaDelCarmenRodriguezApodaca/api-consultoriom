'use strict'
const Antecedente = require ('../models/antecedentes');
  
function addAntecedente(req,res){
    const datos = req.body; 
    if(!datos.idPaciente) return res.status(500).send({message: `Los datos no se enviaron correctamente`});
    var antecedente = new Antecedente();
    antecedente.idPaciente = datos.idPaciente;
    antecedente.alergiaMed = datos.alergiaMed || null;
    antecedente.alergiaMedEsp = datos.alergiaMedEsp || null;
    antecedente.complicacionesAnest = datos.complicacionesAnest || null;
    antecedente.compliacionesAnestEsp = datos.compliacionesAnestEsp || null;
    antecedente.convulsiones = datos.convulsiones || null;
    antecedente.fuma = datos.fuma || null;
    antecedente.fiebre = datos.fiebre || null;
    antecedente.afeccionRenal = datos.afeccionRenal || null;
    antecedente.asma = datos.asma || null;
    antecedente.vihSida = datos.vihSida || null;
    antecedente.anemia = datos.anemia || null;
    antecedente.hipertension = datos.hipertension || null;
    antecedente.hepatitis = datos.hepatitis || null;
    antecedente.diabetes = datos.diabetes || null;
    antecedente.hemofilia = datos.hemofilia || null;
    antecedente.problemasCard = datos.problemasCard || null;
    antecedente.tuberculosis = datos.tuberculosis || null;
    antecedente.embarazo = datos.embarazo || null;
    antecedente.embarazoTiempo = datos.embarazoTiempo || null;
    antecedente.famDiabetes = datos.famDiabetes || null;
    antecedente.famDiabetesNum = datos.famDiabetesNum || null;
    antecedente.famHipertension = datos.famHipertension || null;
    antecedente.famHipertensionNum = datos.famHipertensionNum || null;
    antecedente.famCardiacos = datos.famCardiacos || null;
    antecedente.famCardiacosNum = datos.famCardiacosNum || null;
    antecedente.famCancer = datos.famCancer || null;
    antecedente.famCancerNum = datos.famCancerNum || null;
    antecedente.otro = datos.otro || null;
    antecedente.otroEsp = datos.otroEsp || null;
    antecedente.save((err, antecedenteGuardado)=>{
        if(err) return res.status(500).send({message: `Hubo un problema al guardar los datos ${err}`});
        if(!antecedenteGuardado)return res.status(500).send({message: `Los datos no pudieron guardarse con exito`});
        res.status(200).send({antecedente:antecedenteGuardado});
    })
    
}

function obtenerAntecedentes(req,res){
    Antecedente.find().exec((err,antecedentesEncontrados)=>{
        if(err) return res.status(500).send({meesage: `Hubo un error en los datos: ${err}`});
        if(!antecedentesEncontrados) return res.status(500).send({message: `El antecedente no fue encontrado o no existe`});
        return res.status(200).send({encontrados:antecedentesEncontrados});
    })

}

function obtenerAntecedente(req,res){
    var idAntecedente = req.params.id;

    Antecedente.findOne({paciente:idAntecedente.idPaciente}, (err,antecedenteEncontrado)=>{
        if(err) return res.status(500).send({message: `Hubo un problema al cargar los datos del antecedente ${err}`});
        if(!antecedenteEncontrado) return res.status(500).send({message: `No se encontro el antecedente solicitado`});
        return res.status(200).send({antecedente:antecedenteEncontrado});
    })
} 

//buscar por el id del paciente, no por el del antecedente


module.exports = {
    addAntecedente,
    obtenerAntecedentes,
    obtenerAntecedente
};