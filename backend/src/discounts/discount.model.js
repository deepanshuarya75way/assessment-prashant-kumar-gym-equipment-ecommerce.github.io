const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  area: {
    type: String,
    require : true,
    unique: true, 
  },
  discountPercentage: {
    type: Number,
    require : true,
   
  },
  isActive: {
    type: Boolean,
    default : true
  }},
  {
    timestamps: true
  

});

const Discount = mongoose.model('Discount', discountSchema);
module.exports = Discount;