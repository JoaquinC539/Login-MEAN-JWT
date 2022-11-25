const UserModel=require("../models/User/User");
const userJoi=require("../models/User/userjoi");
const loginJoi=require("../models/Login/loginjoi");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const controller={
    NewUser: async function(req,res){
        //validate user first
        const{error}=userJoi.validate(req.body);
        if(error){
            return res.status(400).json({error:error.details[0].message});
               }
        //Hash password
        const salt= await bcrypt.genSalt(10);
        hashedPassword=await bcrypt.hash(req.body.password,salt);
        //get user data
        const user= new UserModel({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        });
        //Check duplicates
        const duplicateEmail=await UserModel.findOne({email:req.body.email});
        if(duplicateEmail){return res.status(400).json({error:"Email ya registrado"})}
        //Save user
        try{
            await user.save((err,store)=>{
                if(err){return res.status(500).send({message:"Error en la petición",err})};
                if(!store){return res.status(404).send({message:"Metodo no encontardo"})};
                return res.status(200).json({
                    status:"Usuario creado con la cuenta de: "+user.email,

                })
            });    
        } catch{(error)=>{console.log(error),res.send(json.error)}}
    },
    working:async function(req,res){
        res.json({
            estado: true,
            mensaje: 'funciona!'
        })
    },
    login: async function(req,res){
        //Validate login data
        const{error}=loginJoi.validate(req.body);
        if(error){ return res.status(400).json({error:error.details[0].message})}
        //Get user
        const user=await UserModel.findOne({email:req.body.email});
        if(!user){return res.status(400).json({error:"El usuario no existe"})}
        console.log("1. Datos recibidos")
        //Check password
        const validPassword=await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){return res.status(400).json({error:"La contraseña no es valida o correcta"})}
        console.log("2.Datos verificados")
        const token=jwt.sign({
            name:user.name,
            id:user._id,
            email:user.email

        },process.env.TOKEN)
        console.log("3.Token firmado generado con datos de nombre y usuario");
        return res.header('auth-token',token).json({
            error:null,
            data:{token}
        })   
    },
    dash: async function(req,res){
        console.log("7.Por los headers de GET, se pasa el token como peticion(request) con la información dentro");
        res.json({
            error:null,
            data:{
                title:"Ruta protegida",
                user:req.user
            }
        })
        console.log("8.Envia los datos almacenados en el token",req.user)
    }
}

module.exports=controller