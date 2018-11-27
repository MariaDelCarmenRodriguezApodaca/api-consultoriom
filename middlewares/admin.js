exports.isAdmin = (req,res,next)=>{
    if(req.user.puesto != "Doctor") return res.status(500).send({message: `No tienes los permisos necesarios`});
    next();

}