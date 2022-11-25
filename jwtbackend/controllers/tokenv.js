const jwt=require("jsonwebtoken");

//middleware to validate toekns(protected route)

const verifyToken=function (req,res,next){
    const token=req.header('auth-token');
    console.log("4.Backend recibe el token")
    if(!token) return res.status(401).json({error:"Acceso denegado"})
    try{
        const verified=jwt.verify(token,process.env.TOKEN)
        console.log("5. Verifica el token con la clave de jwt");
        req.user=verified
        console.log("6.Verificado el token, se obtiene la inofrmacion del token ")
        next()
    } catch(error){res.status(400).json({error:"Token no valido"})}
}
module.exports=verifyToken