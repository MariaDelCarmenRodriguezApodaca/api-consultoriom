const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

    // bcrypt.hash('ana', null, null, (err, result)=>{
    //     if(err) throw err;
    //     console.log(result);
    // })

// var fechaNacimiento;
// var fechaActual;
// var edad;

//     fechaNacimiento=moment('1997-07-19');
//     fechaActual=moment('2018-11-21');    

//     edad = fechaActual.diff(fechaNacimiento, 'years');
//     console.log(edad);


var fecha = '2018-11-3';
var hoy = moment().format('YYYY-MM-DD');
console.log(hoy);  
