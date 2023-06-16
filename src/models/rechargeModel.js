const mongoose = require("mongoose")





const rechargeSchema = new mongoose.Schema({

   mobile:{
    type:Number,
    require:true
   },

   operator:{
    type: String,
    enum: [ 'Airtel', 'BSNL', 'BSNL STV','Idea','Jio','Vodafone',VI],
    required: true
   } ,
   amount:{
    type:Number,
    default:0,
    required:true
   },
   createdAt:{
    type:Date
   }
})