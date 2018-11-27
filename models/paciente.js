'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pacienteSchema = Schema({
    doctor:{type: Schema.ObjectId, ref:'Trabajador', require:true},
    nombre:{type: String, required: true},
    fechaN:{type: String, require:true },
    edad:{type: String, require:true},
    sexo:{type: String, require:true},
    dirPaciente:{type:String, require:true},
    tel:{type:String, require:true},
    nomRef:{type:String, require:true},
    telRef:{type:String, require:true},
    religion:{type:String, require:true},
    edoCivil:{type:String, require:true},
    hijos:{type: String, require:true},
    usuario:{type: String, require:true},
    password:{type:String, require:true}
});

module.exports = mongoose.model('Paciente', pacienteSchema);