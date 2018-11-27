exports.isEmpleado = (req,res,next)=>{
    if(req.user.puesto != "Asistente" && req.user.puesto != "Doctor") return res.status(500).send({message: `No cuentas con los permisos necesarios`});
    next(); 
}