'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var trabajadorSchema = Schema({
    doctor:{type: Schema.ObjectId, ref:"Trabajador"},
    nombre:{type: String, required: true},
    puesto:{type: String, required: true},
    nss:{type:String, maxLength:11, require: true},
    tel:{type: String, required: true},
    usuario:{type: String, required: true},
    password:{type: String, required: true},
    status:{type: String, required:true}
});

module.exports = mongoose.model('Trabajador', trabajadorSchema);
