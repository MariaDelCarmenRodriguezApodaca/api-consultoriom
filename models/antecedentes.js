'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var antecedenteSchema = ({
    idPaciente:{type:Schema.ObjectId, ref:'Paciente', require:true},
    alergiaMed:{type:String, require:true},
    alergiaMedEsp:{type:String, require:true},  
    complicacionAnest:{type:String, require:true},
    complicacionAnestEsp:{type:String, require:true},    
    convulsiones:{type:String, require:true},
    fuma:{type:String, require:true},
    fiebre:{type:String, require:true},
    afeccionRenal:{type:String, require:true},
    asma:{type:String, require:true},
    vihSida:{type:String, require:true},
    anemia:{type:String, require:true},
    hipertension:{type:String, require:true},
    hepatitis:{type:String, require:true},
    diabetes:{type:String, require:true},
    hemofilia:{type:String, require:true},
    problemasCard:{type:String, require:true},
    tuberculosis:{type:String, require:true},
    embarazo:{type:String, require:true},
    embarazoTiempo:{type:String, require:true},
    famDiabetes:{type:String, require:true},
    famDiabetesNum:{type:String, require:true},
    famHipertension:{type:String, require:true},
    famHipertensionNum:{type:String, require:true},
    famCardiacos:{type:String, require:true},
    famCardiacosNum:{type:String, require:true},
    famCancer:{type:String, require:true},
    famCancerNum:{type:String, require:true},
    otro:{type:String, require:true},
    otroEsp:{type:String, require:true}
});

module.exports = mongoose.model('Antecedente', antecedenteSchema);