const joi=require("@hapi/joi");

const loginSchema=joi.object({
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1024).required()
})

module.exports=loginSchema