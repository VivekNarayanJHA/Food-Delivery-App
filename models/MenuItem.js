const mongoose = require('mongoose');
const Restaurent = require('./Restaurent');


// menu schema 
const menuItemSchema = new mongoose.Schema({
    name: {type:String, required: true},
    price: {type:Number, required: true},
    restaurent: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},

});

module.export=mongoose.model('MenuItem',menuItemSchema);
