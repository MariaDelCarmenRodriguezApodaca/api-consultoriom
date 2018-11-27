'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var consultaSchema = Schema({
    idPaciente:{type:Schema.ObjectId, ref:'Paciente', require:true},
    idHistoria:{type:Schema.ObjectId, ref:'HistoriaM', require:true},
    idCita:{type:Schema.ObjectId, ref:'Cita'},
    descripcion:{type:String},
    motivo: {type:String, require:true},
    observacion: {type:String, require:true},
    fecha: {type:String, require: true},
    costo: {type:String, require:true},
    status: {type:String, require:true}
});

module.exports = mongoose.model('Consulta', consultaSchema);