'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tratamientoSchema = Schema({
    idConsulta:{type:Schema.ObjectId, ref:'Consulta', require:true},
    descripcion:{type:String, require:true}
});

module.exports = mongoose.model('Tratamiento', tratamientoSchema);