'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var historiaMSchema = Schema({
    idPaciente:{type:Schema.ObjectId, ref:'Paciente', require:true}, 
    fecha:{type:String, require:true},
    hora:{type:String, require:true}, 
    respiracion:{type:String, require:true},
    estatura:{type:Number, require:true},
    peso:{type:Number, require:true},
    presionArt:{type:Number, require:true},
    glucosa:{type:Number, require:true},
    temperatura:{type:Number, require:true}
});

module.exports = mongoose.model('HistoriaM', historiaMSchema);