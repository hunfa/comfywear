const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    totalEarning: {
        type: Number,
        required: true,
        default:0
    },
    date:{
        type:Date,
        required:true
    },

    branch:{
        type:String,
        required:true
    },

    orders: [{
        name:String,
        contact:Number,
        totalItems:Number,
        paid:Number,
        due:Number,
        total:Number,
        type:String,
        date:Date,
        subTotal:Number,
        discount:Number,
        products:[{
            title:String,
            code:String,
            Rate:Number,
            qty:Number,
            total:Number
        }]

    }]


});
mongoose.models = {};
module.exports = mongoose.model("order", OrderSchema);