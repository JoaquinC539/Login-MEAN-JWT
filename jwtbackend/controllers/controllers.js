const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const UserModel=require("../models/User/User");
const userJoi=require("../models/User/userjoi");
const loginJoi=require("../models/Login/loginjoi");
const TicketModel=require("../models/Ticket/Ticket");
const ticketjoi=require("../models/Ticket/Ticketjoi");
const Ticket = require("../models/Ticket/Ticket");


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
                if(!store){return res.status(404).send({message:"Metodo no encontrado"})};
                return res.status(200).json({
                    status:"Usuario creado con la cuenta de: "+user.email
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
        //Check password
        const validPassword=await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){return res.status(400).json({error:"La contraseña no es valida o correcta"})}
        const token=jwt.sign({
            name: user.name,
            id:user._id,
            email:user.email
        },process.env.TOKEN,{expiresIn:"15m"});
        return res.header('auth-token',token).json({
            error:null,
            data:{token}
        })   
    },
    dash: async function(req,res){
       return res.json({
            error:null,
            data:{
                title:"Ruta protegida",
                user:req.user
            },
            message:"Autorizado para otros metodos del backend"
        })
    },
    getTickets: async function(req,res){
        await TicketModel.find().exec((err,results)=>{
            if(err) {return status(500).send({message:"Error en los datos"})}
            return res.status(200).send({results})
            
        })
    },
    newTicket:async function(req,res){
        //Verify information
        const {error}=ticketjoi.validate(req.body);
        if(error){
            return res.status(400).json({error:error.details[0].message});
        }
        console.log("Verificación aprobada")
        //Make new service ticket
        const Ticket=new TicketModel({
            author:req.user.name,
            work:req.body.work,
            status:req.body.status,
            comments:req.body.comments,
        });
        //Save ticket
        try{
           await Ticket.save((err,saved)=>{
                if(err){return res.status(500).send({message:"Error en la petición",err})};
                if(!saved){return res.status(404).send({message:"Metodo no encontrado"})};
                return res.status(200).json({
                    status:"Ticket creado"
                })
            })
        }catch{(error)=>{res.json({message:"Hubo un error",error:error})}}
    },
    updateTicket:async function(req,res){
        try{
            await TicketModel.findOneAndUpdate({_id:req.body._id},{status:Boolean(req.body.status)}).exec((err,sucess)=>{
                if(err){return res.status(500).send({message:"Error en la petición",err})};
                if(!sucess){return res.status(404).send({message:"Metodo no encontrado"})};
                return res.status(200).json({
                    status:"Estado actualizado"
                })  
            })
        }catch{error=>{return res.json({message:"Hubo un error"})}} 
    },
    deleteTicket: async function(req,res){
        try{
            await TicketModel.findByIdAndDelete(req.body._id,(err,sucess)=>{
                if(err){return res.status(500).send({message:"Error en la petición",err})};
                if(!sucess){return res.status(404).send({message:"Metodo no encontrado"})};
                return res.status(200).json({
                    status:"Ticket eliminado"
                })     
            })
        }catch{(err)=>{console.log(err)}}
    }
}

module.exports=controller