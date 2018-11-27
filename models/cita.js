'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var citaSchema = Schema({ 
    idDoctor:{type:Schema.ObjectId, ref:'Empleado', require:true},
    idPaciente:{type:Schema.ObjectId, ref:'Paciente', require:true},
    descripcion:{type:String, require:true},
    fecha:{type:String, require:true}, 
    hora:{type:String, require:true},
    turno:{type:String, require:true},
    status:{type:String, require:true}
});

module.exports = mongoose.model('Cita', citaSchema);