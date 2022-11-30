const jwt=require("jsonwebtoken");

//middleware to validate toekns(protected route)

const verifyToken=function (req,res,next){
    const token=req.header('auth-token');
    if(!token) return res.status(401).json({error:"Acceso denegado"})
    try{
        const verified=jwt.verify(token,process.env.TOKEN)
        req.user=verified
        next()
    } catch(error){res.status(400).json({error:"Autorización rechazada"})}
}
module.exports=verifyToken