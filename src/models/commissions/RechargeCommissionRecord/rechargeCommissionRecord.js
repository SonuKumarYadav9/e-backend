import mongoose from "mongoose";


const rechargeCommissionRecord = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    name:{
        type:String,
    },
    commission:{
        type:Number
    },
    role:{
        type:String
    },


},{timestamps:true})

export default mongoose.model("recharge-commission-record",rechargeCommissionRecord)
