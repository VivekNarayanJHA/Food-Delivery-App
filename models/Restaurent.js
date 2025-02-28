const mongoose = require('mongoose');

// schema of restaurant 
const restaurantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user
    menu: [{type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem'}],
});
module.exports = mongoose.model('Restaurent', restaurantSchema);
