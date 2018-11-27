    'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var recetaSchema = Schema({
    idConsulta:{type:Schema.ObjectId, ref:'Consulta', require:true},
    idPaciente:{type:Schema.ObjectId, ref: 'Paciente', require:true},
    medicina:{type:String},
    fecha:{type:String, require:true}    
});

module.exports = mongoose.model('RecetaM', recetaSchema);