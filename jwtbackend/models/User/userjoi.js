const joi=require("@hapi/joi");

const schemaRegister=joi.object({
    name:joi.string().min(0).max(255).required(),
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1024).required()
});

module.exports=schemaRegister