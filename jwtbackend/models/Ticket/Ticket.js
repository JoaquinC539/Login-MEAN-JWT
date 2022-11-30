const  mongoose  = require("mongoose");
const {Schema}=mongoose;
const TicketSchema=new Schema({
    author:String,
    work:String,
    status:Boolean,
    comments:String,
    date:{
        type:Date,
        date:Date.now,
    },
});
module.exports=mongoose.model("Ticket",TicketSchema);

