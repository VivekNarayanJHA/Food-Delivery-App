const mongoose = require('mongoose');
const Restaurent = require('./Restaurent');

// schema for order
const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  });
  
  module.exports = mongoose.model('Order', orderSchema);