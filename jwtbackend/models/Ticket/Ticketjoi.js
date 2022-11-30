const joi =require('@hapi/joi');
const { min } = require('../User/userjoi');

const Ticketjoi=joi.object({
    work: joi.string().min(4).max(30).required(),
    status: joi.boolean(),
    comments: joi.string(),
    //author:joi.string().required()
});

module.exports=Ticketjoi;